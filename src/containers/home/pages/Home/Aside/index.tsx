import React from 'react';
import s from './index.mod.scss';
import ClockCard from './ClockCard';
import DataCard from './DataCard';
import LinkInfoCard from './LinkInfoCard';
import SelfInfoCard from './SelfInfoCard';

const index: React.FC = () => {
    return (
        <aside className={s.aside}>
            <SelfInfoCard />
            <LinkInfoCard />
            <DataCard />
            {/* <ClockCard /> */}
        </aside>
    );
};

export default index;
