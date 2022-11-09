import React from 'react';
import { Layout } from 'antd';
import Header from '../Header';
import Content from '../Content';
import Footer from '../Footer';
// import type { MenuTheme } from 'antd';
import s from './index.mod.scss';

interface MainProps {
    setTheme: any;
}

const index: React.FC<MainProps> = ({ setTheme }) => {
    return (
        <Layout className={s.layout}>
            <Header setTheme={setTheme} />
            <Content />
            <Footer />
        </Layout>
    );
};

export default index;
