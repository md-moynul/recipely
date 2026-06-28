import { Spinner } from '@heroui/react';
import React from 'react';

const loadingPage = () => {
    return (
        <div className="flex min-w-screen min-h-screen items-center justify-center">
            <Spinner color="warning" size="lg" />
        </div>
    );
};

export default loadingPage;