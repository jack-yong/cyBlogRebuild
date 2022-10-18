import React from 'react';
import type { MenuTheme } from 'antd';
import s from './index.mod.scss';
import Sider from 'antd/lib/layout/Sider';
import Menu from './Menu';
import Icon from '@/containers/admin/assets/icons/icon.svg';
interface SiderProps {
    theme?: MenuTheme;
    collapsed: boolean;
}

const index: React.FC<SiderProps> = ({ theme = 'light', collapsed }) => {
    // const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme={theme}
                collapsedWidth={100}
                className={s.sider}
            >
                <div className={s.header}>
                    <img src={Icon} className={s.logo} />
                    <span className={s.title}>CyBlog</span>
                </div>
                <Menu theme={theme} />
            </Sider>
        </>
    );
};

export default index;
