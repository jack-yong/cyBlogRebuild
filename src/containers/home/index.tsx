import React, { Suspense } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import CustomLoading from '@/components/CustomLoading';
import routes from './routers';
import { RouterProvider, createHashRouter } from 'react-router-dom';
const router = createHashRouter(routes);
const index: React.FC = () => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<CustomLoading />}>
                <RouterProvider router={router} />
            </Suspense>
        </ErrorBoundary>
    );
};

export default index;
