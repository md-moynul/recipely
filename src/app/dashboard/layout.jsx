import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { getServerSession } from '@/lib/core/session';
import React from 'react';

const DashboardLayout =async ({ children }) => {
    const user =await getServerSession();
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <DashboardSidebar user={user} />
            <main className='flex-1'>
                {children}
            </main>
            
        </div>
    );
};

export default DashboardLayout;