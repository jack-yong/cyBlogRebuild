import React from 'react';
import type { MenuTheme } from 'antd';
import s from './index.mod.scss';
import Sider from 'antd/lib/layout/Sider';
import Menu from './Menu';
import Icon from '@/containers/admin/assets/icons/icon.svg';
import { useSnapshot } from 'valtio';
import { configStore } from '../../store';

const index: React.FC = () => {
    const { isCollapsed, theme } = useSnapshot(configStore);
    return (
        <>
            <Sider
                collapsible
                collapsed={isCollapsed}
                onCollapse={value => (configStore.isCollapsed = value)}
                theme={theme}
                className={s.sider}
            >
                <div className={s.header}>
                    <img src={Icon} className={s.logo} />
                    {!isCollapsed && <span className={s.title}>CyBlog</span>}
                </div>
                <Menu />
            </Sider>
        </>
    );
};

export default index;
