import React, { Suspense } from 'react';
import s from './index.mod.scss';
import { BackTop, Layout, Spin } from 'antd';
import Header from '@/containers/home/layouts/Header';
import Footer from '@/containers/home/layouts/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Outlet, matchRoutes, useLocation } from 'react-router-dom';
import routes from '../routers';
import { useTitle } from 'ahooks';

const { Content } = Layout;

const BaseLayout: React.FC = () => {
    const location = useLocation();
    const matches = matchRoutes(routes, location);
    const title = matches && matches[matches.length - 1].route?.handle?.title;
    useTitle(`${title}`);
    return (
        <>
            <Layout className={s.appContainer}>
                <Header />
                <Content className={s.appContent}>
                    <ErrorBoundary>
                        <Suspense fallback={<Spin className={s.spinStyle} size='large' />}>
                            <Outlet />
                        </Suspense>
                    </ErrorBoundary>
                </Content>
                <Footer />
                <BackTop>
                    <div className={s.bcakTop}>UP</div>
                </BackTop>
            </Layout>
        </>
    );
};

export default BaseLayout;
