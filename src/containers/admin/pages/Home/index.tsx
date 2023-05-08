import React, { useEffect, useState } from 'react';
import { fetchHomeInfo } from '../../apis/home';
import { useRequest } from 'ahooks';
import s from './index.mod.scss';
import { Divider, Switch } from 'antd';
import DisBoard from './displayBoard';
import { homeIncfoType } from '../../interfaces/home';
const index: React.FC = () => {
    const [type, setType] = useState('tag');

    const useHomeInfoList = useRequest(fetchHomeInfo, {
        manual: true
    });

    useEffect(() => {
        useHomeInfoList.run();
    }, []);

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
                            {/* <Switch defaultChecked checkedChildren="标签" unCheckedChildren="类别" style={{ marginLeft: "10px", marginTop: '5px' }} onChange={switchOpt} /> */}
                            <h2>📊文章数据</h2>
                        </div>
                        {/* <Chart option={pieChartOpt} chartStyles={s.pieStyle} loading={pieLoading} /> */}
                    </div>
                    <div className={s.chartbox}>
                        <h2>✔提交记录</h2>
                        {/* <Chart option={canlderoption} chartStyles={s.canlderStyle} loading={canlderloading} /> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default index;
