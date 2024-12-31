import React from "react";
import { useRouter } from "next/router";
import { Button, Typography } from "@mui/material";

export default function FallbackUI() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="mb-6">
        <svg
          className="w-48 h-48 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01m-6.938 4h13.856c1.054 0 1.538-1.364.83-2.18L13.83 12l6.917-7.82c.708-.816.224-2.18-.83-2.18H5.062c-1.054 0-1.538 1.364-.83 2.18L11.17 12l-6.917 7.82c-.708.816-.224 2.18.83 2.18z"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-bold mb-2">Oops! Something went wrong.</h1>
      <Typography className="text-lg text-gray-500 dark:text-gray-400 mb-8">
        We can’t seem to find the page you’re looking for.
      </Typography>

      <div className="flex space-x-4">
        <Button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Go to Homepage
        </Button>
        <Button
          onClick={() => router.back()}
          className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}
