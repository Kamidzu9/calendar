"use client";
import React, { useState, useMemo } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import { searchEvents, filterEventsByCategory, DEFAULT_CATEGORIES } from '../utils/dates';
import type { Event, EventCategory } from '../types';

interface SearchAndFilterProps {
  events: Event[];
  onFilteredEventsChange: (events: Event[]) => void;
  className?: string;
}

export default function SearchAndFilter({ 
  events, 
  onFilteredEventsChange, 
  className = "" 
}: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | null>(null);

  const allCategories = [
    { id: 'all', name: 'All Categories', color: '#6b7280', icon: '📋' },
    ...DEFAULT_CATEGORIES
  ];

  const filteredEvents = useMemo(() => {
    let result = events;

    // Apply search filter
    if (searchQuery.trim()) {
      result = searchEvents(result, searchQuery);
    }

    // Apply category filter
    if (selectedCategory && selectedCategory.id !== 'all') {
      result = filterEventsByCategory(result, selectedCategory.id);
    }

    return result;
  }, [events, searchQuery, selectedCategory]);

  // Update filtered events when they change
  React.useEffect(() => {
    onFilteredEventsChange(filteredEvents);
  }, [filteredEvents, onFilteredEventsChange]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(allCategories[0]);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 dark:hover:text-gray-300"
            >
              <XMarkIcon className="h-5 w-5 text-gray-400" />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="relative sm:w-48">
          <Listbox value={selectedCategory || allCategories[0]} onChange={setSelectedCategory}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-3 pr-10 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                <span className="flex items-center">
                  <span className="text-base mr-2">
                    {(selectedCategory || allCategories[0]).icon}
                  </span>
                  <span className="block truncate">
                    {(selectedCategory || allCategories[0]).name}
                  </span>
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
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {allCategories.map((category) => (
                    <Listbox.Option
                      key={category.id}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-gray-100'
                        }`
                      }
                      value={category}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`flex items-center ${selected ? 'font-medium' : 'font-normal'}`}>
                            <span className="text-base mr-2">{category.icon}</span>
                            {category.name}
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

        {/* Clear Filters Button */}
        {(searchQuery || (selectedCategory && selectedCategory.id !== 'all')) && (
          <button
            onClick={clearFilters}
            className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 whitespace-nowrap"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Results Summary */}
      {(searchQuery || (selectedCategory && selectedCategory.id !== 'all')) && (
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Found {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} 
          {searchQuery && ` matching "${searchQuery}"`}
          {selectedCategory && selectedCategory.id !== 'all' && ` in ${selectedCategory.name}`}
        </div>
      )}
    </div>
  );
}