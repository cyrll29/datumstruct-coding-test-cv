import { Suspense } from "react";
import LoadingPanel from "@/components/Feedback/LoadingPanel";
import UsersReadError from "@/components/UsersTable/UsersReadError";
import UsersTable from "@/components/UsersTable/UsersTable";
import getErrorMessage from "@/lib/users/getErrorMessage";
import userApi from "@/lib/users/userApi";

async function Users() {
  let users = null;
  let readErrorMessage = null;

  try {
    users = await userApi.readUsers();
  } catch (error) {
    console.error(error);
    readErrorMessage = getErrorMessage(error, "Could not load users.");
  }

  if (readErrorMessage) {
    return <UsersReadError message={readErrorMessage} />;
  }

  return <UsersTable users={users ?? []} />;
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-neo-canvas px-4 py-8 sm:px-6 lg:px-8">
      <main className="flex w-full justify-center">
        <Suspense fallback={<LoadingPanel />}>
          <Users />
        </Suspense>
      </main>
    </div>
  );
}
