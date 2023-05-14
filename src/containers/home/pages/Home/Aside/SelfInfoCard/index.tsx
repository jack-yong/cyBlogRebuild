import React from 'react';
import defaultAvator from '@/containers//home/assets/images/avatar.jpg';
import s from './index.mod.scss';
import Card from '@/containers/home/components/Card';

const index: React.FC = () => {
    const configInfo = {
        title: 'cyong',
        subTitle: '道路是曲折的,前途是光明的'
    };
    return (
        <Card className={s.card}>
            <div className={s.selfinfo}>
                <img src={defaultAvator} alt='默认头像' className={s.image} />
                <h2 className={s.title}>{configInfo.title}</h2>
                <p className={s.desc}>{configInfo.subTitle}</p>
            </div>
        </Card>
    );
};

export default index;
