import { requireRole } from '@/lib/core/session';
import React from 'react';

const UserLayout = async ({ children }) => {
   await requireRole("user");
    return children;
};

export default UserLayout;