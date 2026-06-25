"use client";

import { useState } from "react";
import ManageUsersTable from "./Manageuserstable";

// TODO: import your real API helper, e.g.
// import { setUserBlockedStatus } from "@/lib/api/user";

export default function ManageUsersClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers ?? []);

  const handleBlockToggle = async (userId, nextIsBlocked) => {
    // Optimistic update
    setUsers((prev) =>
      prev.map((u) =>
        (u._id ?? u.id) === userId ? { ...u, isBlocked: nextIsBlocked } : u
      )
    );

    try {
      // TODO: replace with your real server action / API call, e.g.
      // await setUserBlockedStatus(userId, nextIsBlocked);
      console.log("Toggling block status:", userId, nextIsBlocked);
    } catch (err) {
      // Roll back on failure
      setUsers((prev) =>
        prev.map((u) =>
          (u._id ?? u.id) === userId ? { ...u, isBlocked: !nextIsBlocked } : u
        )
      );
      console.error("Failed to update user status:", err);
    }
  };

  return <ManageUsersTable users={users} onBlockToggle={handleBlockToggle} />;
}