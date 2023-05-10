import React from 'react';
import s from './index.mod.scss';
import { Card, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { homeIncfoType } from '@/containers/admin/interfaces/home';
import { isAdmin } from '@/containers/admin/utils/auth';

export interface Props {
    boardata: homeIncfoType[];
    DBloading: boolean;
}

export interface objType {
    data: homeIncfoType[];
    name: string;
}
const DisBoard: React.FC<Props> = ({ boardata, DBloading }) => {
    const buildData = (mydata: homeIncfoType[]) => {
        const rdata = [];
        const articleObj: objType = { name: '文章相关', data: [] };
        const userObj: objType = { name: '用户相关', data: [] };
        const otherObj: objType = { name: '其他', data: [] };
        if (Array.isArray(mydata) && mydata.length !== 0) {
            mydata.map(item => {
                const { key } = item;
                switch (key) {
                    case '/articles/manage':
                    case '/tags':
                    case '/categories':
                        articleObj.data.push(item);
                        break;
                    case '/messages':
                    case '/comments':
                    case '/users':
                    case '/links':
                        if (key === '/users' && !isAdmin()) break;
                        userObj.data.push(item);
                        break;
                    case '/portfolio':
                    case '/logs':
                    case '/talks':
                        otherObj.data.push(item);
                        break;
                    default:
                        break;
                }
            });
            rdata.push(articleObj);
            rdata.push(userObj);
            rdata.push(otherObj);
        }

        return rdata;
    };

    return (
        <Spin spinning={DBloading}>
            <div className={s.board}>
                {boardata &&
                    buildData(boardata).map(item => {
                        return (
                            <Card
                                key={item.name}
                                style={{
                                    borderRadius: '5px',
                                    boxShadow: '0 2px 8px #f0f1f2',
                                    margin: '0 1rem'
                                }}
                            >
                                <div key={item.name} className={s.boxlist}>
                                    <div className={s.title}>
                                        <span className={s.line}></span>
                                        <span>{item.name}</span>
                                    </div>
                                    <div className={s.info}>
                                        {item.data.map((value: homeIncfoType) => {
                                            return (
                                                <Link to={value.key} key={value.name}>
                                                    <div className={s.infolist}>
                                                        <p className={s.title3}>{value.name}</p>
                                                        <p className={s.datanum}>{value.num}</p>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
            </div>
        </Spin>
    );
};

export default DisBoard;
