import React from 'react';
import { Layout, Switch } from 'antd';
import { modeMap, modeMapArr } from '@/containers/admin/utils/modeMap';
import { configStore } from '../../store';
import s from './index.mod.scss';

const { Header } = Layout;

const bodyStyle = window.document.getElementsByTagName('body')[0].style;

const index: React.FC = () => {
    function modeChange(checked: boolean) {
        const mode = Number(!checked);
        configStore.theme = checked ? 'light' : 'dark';
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
