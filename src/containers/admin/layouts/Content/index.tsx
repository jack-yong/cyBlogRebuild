import React, { Suspense } from 'react';
import { Breadcrumb, Layout, Space, Spin } from 'antd';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Link, matchRoutes, Outlet, useLocation } from 'react-router-dom';
import s from './index.mod.scss';
import routes from '../../routes';
import { HomeOutlined } from '@ant-design/icons';

const { Content } = Layout;

const index: React.FC = () => {
    const location = useLocation();
    const matches = matchRoutes(routes, location);

    /* renders */
    const renderBreadcrumb = () => {
        return (matches ?? []).map(i => {
            return (
                <Breadcrumb.Item key={i.pathname}>
                    <Link to={i.route.path || '/'} key={i.pathname} className={s.bItem}>
                        {i.route?.handle?.title ?? <HomeOutlined />}
                    </Link>
                </Breadcrumb.Item>
            );
        });
    };

    return (
        <>
            <Space size='large' className={s.breadcrumb}>
                <Breadcrumb separator={<span className={s.bItem}>/</span>}>
                    {renderBreadcrumb()}
                </Breadcrumb>
            </Space>
            <Content className={s.content}>
                <ErrorBoundary>
                    <Suspense fallback={<Spin className={s.spinStyle} size='large' />}>
                        <Outlet />
                    </Suspense>
                </ErrorBoundary>
            </Content>
        </>
    );
};

export default index;
