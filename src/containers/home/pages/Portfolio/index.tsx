import React, { useEffect } from 'react';
import s from './index.mod.scss';
import Card from '../../components/Card';
import { fetchPortfolioInfo } from '../../apis/portfolio';
import { useRequest } from 'ahooks';

const Portfolio = () => {
    const usePortfolioList = useRequest(fetchPortfolioInfo, { manual: true });

    const portfolioData = usePortfolioList.data?.data;
    useEffect(() => {
        usePortfolioList.run();
    }, []);

    return (
        <Card className={s.portfolio} isStatic={true}>
            <div className={s.list}>
                {portfolioData &&
                    portfolioData.map(item => (
                        <div key={item.portfolioId} className={s.card}>
                            <a href={item.portfolioUrl} target='_blank' rel='noreferrer'>
                                <div className={s.title}>{item.portfolioTitle}</div>
                                <br></br>
                                <div className={s.desc}>{item.portfolioDescribe}</div>
                            </a>
                        </div>
                    ))}
            </div>
        </Card>
    );
};

export default Portfolio;
