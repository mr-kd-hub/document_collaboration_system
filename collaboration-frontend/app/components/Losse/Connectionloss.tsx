import React from "react";
import { useConnectionStatus } from "@/app/customHooks/useConnectionStatus";
import { Typography } from "@mui/material";

const Connectionloss = ({ children }: { children: React.ReactNode }) => {
  const isOnline = useConnectionStatus();

  if (isOnline) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Connection Lost</h1>
        <Typography>Please check your internet connection and try again.</Typography>
      </div>
    </div>
  );
};

export default Connectionloss;
