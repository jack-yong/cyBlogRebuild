import React, { useEffect, useState } from 'react';
import { fetchArticleInfo, fetchCalendarInfo, fetchHomeInfo } from '../../apis/home';
import { useRequest } from 'ahooks';
import s from './index.mod.scss';
import { Divider, Switch } from 'antd';
import DisBoard from './displayBoard';
import { ArticleType, calendarInfoType, homeIncfoType } from '../../interfaces/home';
import Chart from '../../components/Chart';
import usePieCharts, { pieDataProps } from './usePieCharts';
import useCalendar from './useCalendar';
const index: React.FC = () => {
    const year = new Date().getFullYear() + '';
    const [type, setType] = useState<ArticleType>(ArticleType.tag);

    const useHomeInfoList = useRequest(fetchHomeInfo, {
        manual: true
    });

    const useFetchArticleInfo = useRequest(fetchArticleInfo, {
        manual: true
    });

    const useCalendarInfo = useRequest(fetchCalendarInfo, {
        manual: true
    });

    const pieChartOpt = usePieCharts(useFetchArticleInfo.data?.data.data as pieDataProps[]);

    const calendarInfoOpt = useCalendar({
        canData: useCalendarInfo.data?.data as calendarInfoType[],
        year: year
    });

    const switchOpt = (checked: boolean) => {
        if (checked) {
            setType(ArticleType.tag);
        } else {
            setType(ArticleType.category);
        }
    };

    useEffect(() => {
        useHomeInfoList.run();
        useCalendarInfo.run({ year: year });
    }, []);

    useEffect(() => {
        useFetchArticleInfo.run({ type });
    }, [type]);

    return (
        <>
            <div className={s.home}>
                <Divider>数据展示</Divider>
                <DisBoard
                    boardata={useHomeInfoList.data?.data as homeIncfoType[]}
                    DBloading={useHomeInfoList.loading}
                />
                <Divider>图表展示</Divider>
                <div className={s.chartshow}>
                    <div className={s.chartbox}>
                        <div className={s.title}>
                            <Switch
                                defaultChecked
                                checkedChildren='标签'
                                unCheckedChildren='类别'
                                style={{ marginLeft: '10px', marginTop: '5px' }}
                                onChange={switchOpt}
                            />
                            <h2>📊文章数据</h2>
                        </div>
                        <Chart
                            option={pieChartOpt}
                            chartStyles={s.pieStyle}
                            loading={useFetchArticleInfo.loading}
                        />
                    </div>
                    <div className={s.chartbox}>
                        <h2>✔提交记录</h2>
                        <Chart
                            option={calendarInfoOpt}
                            chartStyles={s.canlderStyle}
                            loading={useCalendarInfo.loading}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default index;
