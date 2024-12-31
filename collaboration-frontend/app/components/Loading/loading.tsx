import { Typography } from '@mui/material'
import React from 'react'

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <div className="mb-8">
        <svg
          className="h-20 w-20 text-blue-500 animate-bounce"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m2 0a2 2 0 110 4H7a2 2 0 110-4h6zm-6-8h6m2 0a2 2 0 110 4H7a2 2 0 110-4h6z"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-semibold mb-2">Loading, please wait...</h1>
      <Typography className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        We&apos;re getting things ready for you. This won&apos;t take long.
      </Typography>

      <div className="space-y-4">
        <div className="h-4 w-64 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
        <div className="h-4 w-56 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
        <div className="h-4 w-40 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}

export default Loading