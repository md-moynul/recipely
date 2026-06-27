"use client";

import { useState } from "react";
import ManageUsersTable from "./ManageUsersTable";
import { userStatusToggle } from "@/lib/action/user";
import { toast } from "react-toastify";


export default function ManageUsers({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers ?? []);
  const [currentUser, setCurrentUser] = useState(null);
  const handleBlockToggle = async (userId, nextIsBlocked) => {
    // Optimistic update
    setUsers((prev) =>
      prev.map((u) =>
        (u._id ?? u.id) === userId ? { ...u, isBlocked: nextIsBlocked } : u
      )
    );

    try {
     const result = await userStatusToggle (userId, nextIsBlocked);
     if(result.modifiedCount){
      toast.success(`${nextIsBlocked ? "Blocked" : "Unblocked"} ${currentUser} successfully`);
     }
     
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

  return <ManageUsersTable users={users} onBlockToggle={handleBlockToggle} currentUser={currentUser} setCurrentUser={setCurrentUser} />;
}