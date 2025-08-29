"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { Fragment } from "react";
import { toast } from "react-toastify";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { fmtDate, DEFAULT_CATEGORIES, sanitizeEventInput, validateEventData } from "../utils/dates";
import type { Event, EventCategory } from "../types";

interface AddEventDialogProps {
  open: boolean;
  date: Date;
  onClose: () => void;
  onSubmit: (data: Omit<Event, 'id'>) => void;
}

export default function AddEventDialog({
  open,
  date,
  onClose,
  onSubmit,
}: AddEventDialogProps) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("10:00");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<EventCategory>(DEFAULT_CATEGORIES[0]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setTitle("");
      setDesc("");
      setStart("09:00");
      setEnd("10:00");
      setLocation("");
      setCategory(DEFAULT_CATEGORIES[0]);
      setErrors([]);
    }
  }, [open]);

  const computed = useMemo(() => {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const startDate = new Date(date);
    startDate.setHours(sh ?? 0, sm ?? 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(eh ?? 0, em ?? 0, 0, 0);
    return { startDate, endDate };
  }, [date, start, end]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const sanitizedTitle = sanitizeEventInput(title);
    const sanitizedDesc = sanitizeEventInput(desc);
    const sanitizedLocation = sanitizeEventInput(location);
    
    const eventData: Partial<Event> = {
      title: sanitizedTitle,
      description: sanitizedDesc || undefined,
      location: sanitizedLocation || undefined,
      startTime: computed.startDate,
      endTime: computed.endDate,
      category,
    };
    
    const validationErrors = validateEventData(eventData);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      validationErrors.forEach(error => toast.error(error));
      return;
    }
    
    onSubmit({
      title: sanitizedTitle,
      description: sanitizedDesc || undefined,
      location: sanitizedLocation || undefined,
      startTime: computed.startDate,
      endTime: computed.endDate,
      category,
      color: category.color,
    } as Omit<Event, 'id'>);
    
    onClose();
    toast.success("Event created successfully!");
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-2">
          <Transition.Child
            as={Fragment}
            enter="transition-transform ease-out duration-150"
            enterFrom="opacity-0 scale-95 translate-y-2"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="transition-transform ease-in duration-100"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-2"
          >
            <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <Dialog.Title className="text-xl font-bold text-blue-700 dark:text-blue-300">
                Add event for {fmtDate(date)}
              </Dialog.Title>
              <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Title
                  </span>
                  <input
                    className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 outline-none focus:ring-2 focus:ring-blue-400"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Standup"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Description
                  </span>
                  <textarea
                    className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 outline-none focus:ring-2 focus:ring-blue-400"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Optional details"
                    rows={3}
                  />
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Start
                    </span>
                    <input
                      type="time"
                      className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 outline-none focus:ring-2 focus:ring-blue-400"
                      value={start}
                      onChange={(e) => setStart(e.target.value)}
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      End
                    </span>
                    <input
                      type="time"
                      className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 outline-none focus:ring-2 focus:ring-blue-400"
                      value={end}
                      onChange={(e) => setEnd(e.target.value)}
                      required
                    />
                  </label>
                </div>
                
                {/* Category Selection */}
                <div className="block">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Category
                  </span>
                  <Listbox value={category} onChange={setCategory}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-3 pr-10 py-2 text-left outline-none focus:ring-2 focus:ring-blue-400">
                        <span className="flex items-center">
                          <span className="text-lg mr-2">{category.icon}</span>
                          <span className="block truncate">{category.name}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {DEFAULT_CATEGORIES.map((cat) => (
                            <Listbox.Option
                              key={cat.id}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                  active ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-gray-100'
                                }`
                              }
                              value={cat}
                            >
                              {({ selected }) => (
                                <>
                                  <span className={`flex items-center ${selected ? 'font-medium' : 'font-normal'}`}>
                                    <span className="text-lg mr-2">{cat.icon}</span>
                                    {cat.name}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>

                {/* Location */}
                <label className="block">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Location
                  </span>
                  <input
                    className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 outline-none focus:ring-2 focus:ring-blue-400"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Optional location"
                  />
                </label>

                {/* Error Display */}
                {errors.length > 0 && (
                  <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-3">
                    <div className="text-sm text-red-800 dark:text-red-200">
                      <ul className="list-disc list-inside">
                        {errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-md bg-blue-600 text-white px-3 py-2 hover:bg-blue-700"
                  >
                    Create
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
