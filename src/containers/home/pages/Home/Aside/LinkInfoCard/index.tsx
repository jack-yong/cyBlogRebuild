import React from 'react';
import s from './index.mod.scss';
import Icon, { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons';
import IconButton from './IconButton';
import qqImage from '@/containers/home/assets/images/qq.jpg';
import wechat from '@/containers/home/assets/images/wechat.jpg';
import Card from '@/containers/home/components/Card';

const index: React.FC = () => {
    const juejinSvg = () => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='36'
            height='28'
            viewBox='0 0 36 28'
            fill='currentColor'
        >
            <path d='M17.5875 6.77268L21.8232 3.40505L17.5875 0.00748237L17.5837 0L13.3555 3.39757L17.5837 6.76894L17.5875 6.77268ZM17.5863 17.3955H17.59L28.5161 8.77432L25.5526 6.39453L17.59 12.6808H17.5863L17.5825 12.6845L9.61993 6.40201L6.66016 8.78181L17.5825 17.3992L17.5863 17.3955ZM17.5828 23.2891L17.5865 23.2854L32.2133 11.7456L35.1768 14.1254L28.5238 19.3752L17.5865 28L0.284376 14.3574L0 14.1291L2.95977 11.7531L17.5828 23.2891Z' />
        </svg>
    );

    const homePage = [
        {
            link: 'https://github.com/jack-yong',
            icon: <GithubOutlined />,
            content: '',
            isLink: true
        },
        {
            link: 'https://juejin.cn/user/427081105940919',
            icon: <Icon component={juejinSvg} />,
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
