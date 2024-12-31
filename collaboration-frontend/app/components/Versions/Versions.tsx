/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "@mui/material";
import React from "react";

function Versions(props: { versionList: any[]; loadVersion: any }) {
  const { versionList, loadVersion } = props;
  const sortedVersionList = [...versionList].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="overflow-y-auto max-h-[calc(100vh-100px)] p-4">
      {sortedVersionList && sortedVersionList.length ? (
        <ul className="space-y-6">
          {sortedVersionList.map((version: any, index: number) => (
            <li
              key={index}
              className="relative p-4 border rounded-lg shadow-sm hover:shadow-lg cursor-pointer transition-all bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => loadVersion(version)}
            >
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full mt-2 -left-2 border border-white dark:border-gray-800 dark:bg-gray-700"></div>
              <time className="block mb-2 text-sm text-gray-500 dark:text-gray-400">
                {new Date(version?.createdAt).toLocaleString()}
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {version.title || "Untitled document"}
              </h3>
              <Typography className="text-base text-gray-700 dark:text-gray-400 truncate">
                {version.content || "No content available."}
              </Typography>
            </li>
          ))}
        </ul>
      ) : (
        <Typography className="flex justify-center items-center p-2 text-gray-500 dark:text-gray-400">
          No versions available
        </Typography>
      )}
    </div>
  );
}

export default Versions;
