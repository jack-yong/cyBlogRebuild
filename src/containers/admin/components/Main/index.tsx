import React from 'react';
import { Layout } from 'antd';
import Header from '../Header';
import Content from '../Content';
import Footer from '../Footer';
// import type { MenuTheme } from 'antd';

interface MainProps {
    setCollapsed: any;
    collapsed: boolean;
}

const index: React.FC<MainProps> = ({ setCollapsed, collapsed }) => {
    return (
        <Layout>
            <Header setCollapsed={setCollapsed} collapsed={collapsed} />
            <Content />
            <Footer />
        </Layout>
    );
};

export default index;
