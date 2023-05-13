import React from 'react';
import s from './index.mod.scss';
import Icon from '@/containers/admin/assets/icons/icon.svg';

const LeftHeader: React.FC = () => {
    return (
        <div className={s.headerLeft}>
            <img src={Icon} className={s.logo} />
            <span className={s.title}>CyBlog</span>
        </div>
    );
};

export default LeftHeader;
