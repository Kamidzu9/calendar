"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { toast } from "react-toastify";
import { fmtDate } from "../utils/dates";

interface AddEventDialogProps {
  open: boolean;
  date: Date;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
  }) => void;
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

  useEffect(() => {
    if (open) {
      setTitle("");
      setDesc("");
      setStart("09:00");
      setEnd("10:00");
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
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (computed.endDate <= computed.startDate) {
      toast.error("End time must be after start time");
      return;
    }
    onSubmit({
      title: title.trim(),
      description: desc.trim() || undefined,
      startTime: computed.startDate,
      endTime: computed.endDate,
    });
    onClose();
    toast.success("Event created");
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
