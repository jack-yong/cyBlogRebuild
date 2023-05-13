import React, { Suspense } from 'react';
import './index.scss';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import ErrorBoundary from '@/components/ErrorBoundary';
import CustomLoading from '@/components/CustomLoading';
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
