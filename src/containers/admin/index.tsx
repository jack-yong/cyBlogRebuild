import React, { useState } from 'react';
import type { MenuTheme } from 'antd';
import './index.scss';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
const router = createHashRouter(routes);
const index: React.FC = () => {
    const [theme, setTheme] = useState<MenuTheme>('light');
    return <RouterProvider router={router} />;
};

export default index;
