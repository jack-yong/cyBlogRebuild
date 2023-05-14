import React from 'react';
import s from './index.mod.scss';
import { Popover } from 'antd';

interface IconButtonPorps {
    link?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content?: any;
    isLink: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any;
}

const index: React.FC<IconButtonPorps> = ({ link, content, isLink, children }) => {
    return isLink ? (
        <a className={s.iconBtn} href={link} target='_blank' rel='noreferrer'>
            {children}
        </a>
    ) : (
        <Popover trigger='hover' className={s.iconBtn} content={content} overlayClassName={s.card}>
            {children}
        </Popover>
    );
};

export default index;
