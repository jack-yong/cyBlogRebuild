import React from 'react';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import s from './index.mod.scss';

const { Header } = Layout;
interface HeaderProps {
    setCollapsed: any;
    collapsed: boolean;
}

const index: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
    return (
        <Header className={s.header}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: `${s.collapsedtrigger}`,
                onClick: () => setCollapsed(!collapsed)
            })}
        </Header>
    );
};

export default index;
