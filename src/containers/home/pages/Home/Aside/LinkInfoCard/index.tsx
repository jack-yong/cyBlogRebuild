import React from 'react';
import s from './index.mod.scss';
import { GithubOutlined, ZhihuOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons';
import IconButton from './IconButton';
import qqImage from '@/containers/home/assets/images/qq.jpg';
import wechat from '@/containers/home/assets/images/wechat.jpg';
import Card from '@/containers/home/components/Card';

const index: React.FC = () => {
    const homePage = [
        {
            link: 'https://github.com/jack-yong',
            icon: <GithubOutlined />,
            content: '',
            isLink: true
        },
        {
            link: 'https://juejin.cn/user/427081105940919',
            icon: <ZhihuOutlined />,
            content: '',
            isLink: true
        },
        {
            link: '',
            icon: <QqOutlined />,
            content: <img src={qqImage} alt='QQ' className={s.image} />,
            isLink: false
        },
        {
            link: '',
            icon: <WechatOutlined />,
            content: <img src={wechat} alt='WeChat' className={s.image} />,
            isLink: false
        }
    ];
    return (
        <Card className={s.card}>
            {homePage.map(({ link, content, isLink, icon }, index) => (
                <IconButton isLink={isLink} link={link} content={content} key={index}>
                    {icon}
                </IconButton>
            ))}
        </Card>
    );
};

export default index;
