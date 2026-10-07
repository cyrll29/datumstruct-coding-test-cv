"use client";

import { useRouter } from "next/navigation";
import ErrorPanel from "@/components/Feedback/ErrorPanel";

export default function UsersReadError({ message }) {
  const router = useRouter();

  return (
    <ErrorPanel
      title="Could not load users"
      message={message}
      onRetry={() => router.refresh()}
    />
  );
}
