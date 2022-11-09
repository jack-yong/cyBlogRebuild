import React, { useState } from 'react';
import { Layout } from 'antd';
import type { MenuTheme } from 'antd';
import Sider from './components/Sider';
import Main from './components/Main';
import './index.scss';
import s from './index.mod.scss';

const index: React.FC = () => {
    const [theme, setTheme] = useState<MenuTheme>('light');
    return (
        <Layout className={s.adminContainer}>
            <Sider theme={theme} />
            <Main setTheme={setTheme} />
        </Layout>
    );
};

export default index;
