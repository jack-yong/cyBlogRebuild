import React from 'react';
import { Layout, Switch } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { modeMap, modeMapArr } from '@/containers/admin/utils/modeMap';
import { useLocalStorageState, useUpdateEffect } from 'ahooks';
import s from './index.mod.scss';

const { Header } = Layout;
interface HeaderProps {
    setTheme: any;
}
const bodyStyle = window.document.getElementsByTagName('body')[0].style;

const index: React.FC<HeaderProps> = ({ setTheme }) => {
    function modeChange(checked: boolean) {
        const mode = Number(!checked);
        setTheme(checked ? 'light' : 'dark');
        for (const type of modeMapArr) {
            bodyStyle.setProperty(type, modeMap[type as keyof typeof modeMap][mode]);
        }
    }

    return (
        <Header className={s.header}>
            <Switch defaultChecked onChange={checked => modeChange(checked)} />
        </Header>
    );
};

export default index;
