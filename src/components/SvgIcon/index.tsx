import React from 'react';

interface SvgIconProps {
    iconNames: string;
    className?: string;
}

const index: React.FC<SvgIconProps> = ({ iconNames, className }) => {
    return (
        <svg className={className} aria-hidden='true'>
            <use xlinkHref={'#icon-' + iconNames}></use>
        </svg>
    );
};

export default index;
