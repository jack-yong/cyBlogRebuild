import React, { useEffect } from 'react';
import s from './index.mod.scss';
import { Timeline } from 'antd';
import Card from '../../components/Card';
import { useRequest } from 'ahooks';
import { fetchTalkInfo } from '../../apis/talk';
import defaultAvator from '../../assets/images/avatar.jpg';
import dayjs from 'dayjs';
const Talk = () => {
    const useTalkList = useRequest(fetchTalkInfo, { manual: true });

    const pushpinsData = useTalkList.data?.data;
    useEffect(() => {
        useTalkList.run();
    }, []);
    return (
        <Card className={s.pushpins} isStatic={true}>
            <Timeline>
                {pushpinsData &&
                    pushpinsData.map(item => (
                        <Timeline.Item style={{ fontSize: '30px' }} key={item.dspeechId}>
                            <div className={s.item} key={item.dspeechId}>
                                <img src={defaultAvator} alt='logo' className={s.avator} />
                                <div className={s.content}>{item.dspeechContent}</div>
                                <div className={s.time}>
                                    {dayjs(item.dspeechDate).format('YYYY-MM-DD HH:mm:ss')}
                                </div>
                            </div>
                        </Timeline.Item>
                    ))}
            </Timeline>
            {/* </div> */}
        </Card>
    );
};

export default Talk;
