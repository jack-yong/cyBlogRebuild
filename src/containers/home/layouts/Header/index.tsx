import React from 'react';
import s from './index.mod.scss';
import { Layout } from 'antd';
import LeftHeader from './LeftHeader';
import RightHeader from './RightHeader';

const { Header } = Layout;

const CustomHeader: React.FC = () => {
    return (
        <div className={s.appheaderRoot}>
            <Header className={s.appHeader}>
                <LeftHeader />
                <RightHeader />
            </Header>
        </div>
    );
};

export default CustomHeader;
