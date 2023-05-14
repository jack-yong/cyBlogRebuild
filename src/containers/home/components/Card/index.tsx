import classNames from 'classnames';
import React from 'react';
import s from './index.mod.scss';
import { Skeleton } from 'antd';

interface CardProps {
    className: string;
    loading?: boolean;
    children: React.ReactNode;
    isStatic?: boolean;
    // eslint-disable-next-line
    onClick?: any;
    skeHeight?: number;
}

const Card: React.FC<CardProps> = ({
    className,
    loading,
    children,
    isStatic,
    onClick,
    skeHeight
}) => {
    return (
        <div
            className={classNames(
                s.card,
                { [s.center]: loading },
                { [s.active]: !isStatic },
                className
            )}
            onClick={onClick}
        >
            {loading ? <Skeleton paragraph={{ rows: skeHeight ? skeHeight : 1 }} /> : children}
        </div>
    );
};

export default Card;
