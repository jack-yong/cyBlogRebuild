import React, { useEffect } from 'react';
import s from './index.mod.scss';
import { Tag, Timeline } from 'antd';
import { devLogType, devLogTypeObj } from '../../interfaces/devlog';
import { BugOutlined, CheckOutlined, RedoOutlined, RocketOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { fetchDevlogInfo } from '../../apis/devlog';
import dayjs from 'dayjs';
import Card from '../../components/Card';

const DevLog = () => {
    const useDevlogList = useRequest(fetchDevlogInfo, {
        manual: true
    });

    const devLogInfo = useDevlogList.data?.data;

    useEffect(() => {
        useDevlogList.run();
    }, []);
    const switchIcon = (kind: devLogType) => {
        switch (kind) {
            case devLogType.feat:
                return (
                    <Tag color={'success'} icon={<CheckOutlined />}>
                        {devLogTypeObj[devLogType.feat]}
                    </Tag>
                );
            case devLogType.fix:
                return (
                    <Tag color={'error'} icon={<BugOutlined />}>
                        {devLogTypeObj[devLogType.fix]}
                    </Tag>
                );
            case devLogType.refactor:
                return (
                    <Tag color={'processing'} icon={<RedoOutlined />}>
                        {devLogTypeObj[devLogType.refactor]}
                    </Tag>
                );
            case devLogType.perf:
                <Tag color={'warning'} icon={<RocketOutlined />}>
                    {devLogTypeObj[devLogType.perf]}
                </Tag>;
                break;
            default:
                break;
        }
    };
    return (
        <Card className={s.devlog} isStatic={true}>
            <Timeline>
                {devLogInfo &&
                    devLogInfo.map(item => (
                        <Timeline.Item style={{ fontSize: '30px' }} key={item.devlogId}>
                            <div className={s.dlitem}>
                                <div className={s.title}>{item.dlTitle}</div>
                                <div className={s.icon}>{switchIcon(item.dlType)}</div>
                                <div className={s.content}>{item.dlContent}</div>
                                <div className={s.time}>
                                    {dayjs(item.dlDate).format('YYYY-MM-DD HH:mm:ss')}
                                </div>
                            </div>
                        </Timeline.Item>
                    ))}
            </Timeline>
        </Card>
    );
};

export default DevLog;
