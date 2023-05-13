import React from 'react';
import s from './index.mod.scss';
import Menu from './Menu';
import { SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const RightHeader: React.FC = () => {
    const toAdmin = () => {
        window.location.href = 'http://101.132.119.45:8136/#/home';
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
