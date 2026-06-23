import React from 'react';
import AddRecipePage from './AddRecipePage';
import { getServerSession } from '@/lib/core/session';

const page = async () => {
    const user =await getServerSession();
    return (
        <div>
            <AddRecipePage user={user} />
        </div>
    );
};

export default page;