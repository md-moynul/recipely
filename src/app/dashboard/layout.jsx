import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { getUserById } from '@/lib/api/user';
import { getServerSession } from '@/lib/core/session';
import React from 'react';

const DashboardLayout =async ({ children }) => {
    const user =await getServerSession();
    const userdata =  await getUserById(user?.id);
    const isPremium = userdata?.isPremium;
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <DashboardSidebar user={user} isPremium={isPremium} />
            <main className='flex-1'>
                {children}
            </main>
            
        </div>
    );
};

export default DashboardLayout;