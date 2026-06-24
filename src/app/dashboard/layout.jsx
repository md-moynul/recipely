import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { getServerSession } from '@/lib/core/session';
import React from 'react';

const DashboardLayout = ({ children }) => {
    const user = getServerSession();
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <DashboardSidebar isPremium={user?.isPremium} />
            <main className='flex-1'>
                {children}
            </main>
            
        </div>
    );
};

export default DashboardLayout;