import React, { useEffect } from 'react';
import s from './index.mod.scss';
import { useNavigate } from 'react-router-dom';
import Card from '@/containers/home/components/Card';
import { useRequest } from 'ahooks';
import { fetchBlogDataInfo } from '@/containers/home/apis/home';
import { homeDataType } from '@/containers/home/interfaces/home';

const index: React.FC = () => {
    const navigate = useNavigate();

    const useHomeData = useRequest(fetchBlogDataInfo, { manual: true });

    const homeData = useHomeData.data?.data;

    useEffect(() => {
        useHomeData.run();
    }, []);
    return (
        <Card className={s.card} loading={useHomeData.loading}>
            {homeData &&
                homeData.map((item: homeDataType) => (
                    <div
                        className={s.showitem}
                        key={item.key}
                        onClick={() => {
                            navigate(item.key);
                        }}
                    >
                        <div className={s.title}>{item.name}</div>
                        <div className={s.content}>{item.num}</div>
                    </div>
                ))}
        </Card>
    );
};

export default index;
