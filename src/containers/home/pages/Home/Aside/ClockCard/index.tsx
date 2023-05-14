import React, { useEffect, useState } from 'react';
import s from './index.mod.scss';
import Card from '@/containers/home/components/Card';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

const index: React.FC = () => {
    const [value, setValue] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Card className={s.card}>
            <h3 className={s.title}>当前时间:</h3>
            <Clock value={value} />
        </Card>
    );
};

export default index;
