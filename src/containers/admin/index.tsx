import React, { useState } from 'react';
import { Layout } from 'antd';
import type { MenuTheme } from 'antd';
import Sider from './components/Sider';
import Main from './components/Main';
import './index.scss';
import s from './index.mod.scss';

const index: React.FC = () => {
    const [theme, setTheme] = useState<MenuTheme>('light');
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout className={s.adminContainer}>
            <Sider theme={theme} collapsed={collapsed} />
            <Main setCollapsed={setCollapsed} collapsed={collapsed} />
        </Layout>
    );
};

export default index;
