import EditRecipeForm from '@/components/dashboard/EditRecipeForm';
import React from 'react';

const page = async ({ params }) => {
    const {id} =await params;
    return <EditRecipeForm id={id} />;
};

export default page;