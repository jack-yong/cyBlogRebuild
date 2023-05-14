import React from 'react';

import s from './index.mod.scss';
import Section from './Section';
import Aside from './Aside';

const Home = () => {
    return (
        <div className={s.body}>
            <Section />
            <Aside />
        </div>
    );
};

export default Home;
