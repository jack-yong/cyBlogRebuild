import React from 'react';
import { Layout } from 'antd';
import Header from '@/containers/admin/layouts/Header';
import Content from '@/containers/admin/layouts/Content';
import Footer from '@/containers/admin/layouts/Footer';
import Sider from './Sider';
// import type { MenuTheme } from 'antd';
import s from './index.mod.scss';

const baseLayout: React.FC = () => {
    return (
        <Layout className={s.adminContainer}>
            <Sider />
            <Layout className={s.layout}>
                <Header />
                <Content />
                <Footer />
            </Layout>
        </Layout>
    );
};

export default baseLayout;
