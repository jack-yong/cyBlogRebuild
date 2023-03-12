import React from 'react';
import s from './index.mod.scss';
const Loading = () => {
    return (
        <div className={s.cell}>
            <div className={s.spinner}></div>
        </div>
    );
};

export default Loading;
