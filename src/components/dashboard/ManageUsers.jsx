"use client";
import { useState } from "react";
import { userStatusToggle } from "@/lib/action/user";
import { toast } from "react-toastify";
import ManageUserTable from "./ManageUserTable";


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
      
      toast.success(`${currentUser ? currentUser : 'User'} ${nextIsBlocked ? 'blocked' : 'unblocked'}`);
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

  return <ManageUserTable users={users} onBlockToggle={handleBlockToggle} currentUser={currentUser} setCurrentUser={setCurrentUser} />;
}