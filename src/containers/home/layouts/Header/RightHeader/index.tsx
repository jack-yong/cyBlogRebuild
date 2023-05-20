import React from 'react';
import s from './index.mod.scss';
import Menu from './Menu';
import { SettingOutlined } from '@ant-design/icons';
const RightHeader: React.FC = () => {
    const toAdmin = () => {
        window.location.href = 'http://cyong.online:8136/';
    };

    return (
        <div className={s.headerRight}>
            <Menu />
            <div className={s.headerInfo}>
                <SettingOutlined className={s.adminIcon} onClick={toAdmin} />
            </div>
        </div>
    );
};

export default RightHeader;
