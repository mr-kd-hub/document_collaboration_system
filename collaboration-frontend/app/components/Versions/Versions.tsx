/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

function Versions(props: { versionList: any[]; loadVersion: any }) {
  const { versionList, loadVersion } = props;
  const sortedVersionList = [...versionList].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <ol className="relative border-s h-full border-gray-200 dark:border-gray-700">
      {sortedVersionList && sortedVersionList.length ? (
        <>
          {sortedVersionList.map((version: any, index: number) => {
            return (
                <li key={index} className="mb-10 ms-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {new Date(version?.createdAt).toLocaleString()}
                  </time>
                  <h3
                    onClick={() => loadVersion(version)}
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
          {/* {displayedItems.length < versionList.length && (
            <div className="flex w-full justify-center items-center p-2">
                <button className="text-blue-900" color="blue" onClick={loadMore}>Load More</button>
            </div>            
          )} */}
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
