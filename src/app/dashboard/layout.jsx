import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen justify-start">
            <DashboardSidebar isPremium={true} />
            <main className='flex-1'>
                {children}
            </main>
            
        </div>
    );
};

export default DashboardLayout;