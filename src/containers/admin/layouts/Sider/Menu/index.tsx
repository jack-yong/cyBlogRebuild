import React, { useState } from 'react';
import { Menu } from 'antd';
import { matchRoutes, NavLink as Link, RouteObject, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import routes from '@/containers/admin/routes';
import { configStore } from '@/containers/admin/store';
import { useSnapshot } from 'valtio';

const index: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const matches = matchRoutes(routes, location) ?? [];
    const menuData = (matches[0].route.children ?? []).filter(i => i?.handle?.title);
    const { isCollapsed, theme } = useSnapshot(configStore);
    const [activeMenus, setActiveMenus] = useState<string[]>([location.pathname]);
    const renderMenu = (routes: RouteObject[]) => {
        return routes.map((route): any => {
            return {
                label: route.handle.title,
                icon: route.handle.icon,
                key: route.path,
                children: route.children
                    ? renderMenu(route.children.filter(i => i?.handle?.title))
                    : undefined
            };
        });
    };

    return (
        <>
            <Menu
                theme={theme}
                mode='inline'
                defaultOpenKeys={[menuData[0].path as string]}
                defaultSelectedKeys={[location.pathname]}
                inlineCollapsed={isCollapsed}
                selectedKeys={activeMenus}
                onSelect={({ key }) => {
                    setActiveMenus([key]);
                    navigate(key);
                }}
                items={renderMenu(menuData)}
            />
        </>
    );
};

export default index;
