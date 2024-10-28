import React from "react";

const ListSkeleton = () => {
  return (
    <div
      role="status"
      class="w-full bg-white p-4 space-y-4 border-gray-200 divide-y divide-gray-200 animate-pulse md:p-6"
    >
      <div class="w-full flex items-center justify-between">
        <div className="w-full">
          <div class="h-2.5 bg-gray-300 rounded-full w-1/2 mb-2.5"></div>
          <div class="w-1/3 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-1/3"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
        <div className="w-full">
          <div class="h-2.5 bg-gray-300 rounded-full w-1/2 mb-2.5"></div>
          <div class="w-1/3 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-1/3"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
        <div className="w-full">
          <div class="h-2.5 bg-gray-300 rounded-full w-1/2 mb-2.5"></div>
          <div class="w-1/3 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-1/3"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
        <div className="w-full">
          <div class="h-2.5 bg-gray-300 rounded-full w-1/2 mb-2.5"></div>
          <div class="w-1/3 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-1/3"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
        <div className="w-full">
          <div class="h-2.5 bg-gray-300 rounded-full w-1/2 mb-2.5"></div>
          <div class="w-1/3 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-1/3"></div>
      </div>
      <span class="sr-only">Loading...</span>
    </div>
  );
};

export default ListSkeleton;
