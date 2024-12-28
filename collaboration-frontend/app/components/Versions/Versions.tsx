/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

function Versions(props: { versionList: any[]; setValues: any }) {
  const { versionList, setValues } = props;

  console.log("versionList",versionList);
  
  const [state, setState] = useState({ currentPage: 0, itemsPerPage: 4, displayedItems:[] });
  const { currentPage, itemsPerPage, displayedItems } = state;

  const handleVesrsion = (version: any) => {
    setValues((prevState: any) => ({
      ...prevState,
      title: version?.title || "Untitled document",
      content: version?.content,
    }));
  };
  
  const loadMore = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newItems = versionList.slice(startIndex, endIndex);
    setState((prev:any) => ({
      ...prev,
      currentPage: prev?.currentPage + 1,
      displayedItems: [...prev.displayedItems, ...newItems],
    }));
  };

  useEffect(() => {
    loadMore();
  }, []);
  
  
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {displayedItems && displayedItems.length ? (
        <>
          {displayedItems.map((version: any, index: number) => {
            return (
                <li key={index} className="mb-10 ms-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {new Date(version.createdAt).toLocaleString()}
                  </time>
                  <h3
                    onClick={() => handleVesrsion(version)}
                    className="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    {version.title || "Untitled document"}
                  </h3>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    {version.content || "-"}
                  </p>
                </li>
            );
          })}
          {displayedItems.length < versionList.length && (
            <div className="flex w-full justify-center items-center p-2">
                <button className="text-blue-900" color="blue" onClick={loadMore}>Load More</button>
            </div>            
          )}
        </>
      ) : (
        <div className="flex w-full justify-center items-center p-2">
            No vesions available
        </div>        
      )}
    </ol>
  );
}

export default Versions;
