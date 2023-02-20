import React, { Suspense } from 'react';
import { Layout, Spin } from 'antd';
import ErrorBoundary from '../../components/ErrorBoundary';
import { Outlet } from 'react-router-dom';
import s from './index.mod.scss';

const { Content } = Layout;

const index: React.FC = () => {
    return (
        <Content className={s.content}>
            <ErrorBoundary>
                <Suspense fallback={<Spin style={{ margin: 'auto' }} size='large' />}>
                    <Outlet />
                </Suspense>
            </ErrorBoundary>
        </Content>
    );
};

export default index;
