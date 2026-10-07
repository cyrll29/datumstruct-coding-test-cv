"use client";

import { useEffect } from "react";
import ErrorPanel from "@/components/Feedback/ErrorPanel";

export default function Error({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-neo-canvas px-4 py-8 sm:px-6 lg:px-8">
      <main className="flex w-full justify-center">
        <ErrorPanel
          title="Something went wrong"
          message={error?.message || "An unexpected error occurred."}
          onRetry={retry}
        />
      </main>
    </div>
  );
}
