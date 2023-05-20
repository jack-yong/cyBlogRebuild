import React from 'react';
import { Button, Layout } from 'antd';
import s from './index.mod.scss';
const { Footer } = Layout;

const CustomFooter: React.FC = () => {
    return (
        <Footer
            style={{
                textAlign: 'center'
            }}
        >
            <a
                href='https://github.com/jack-yong'
                className={s.link}
                target='_blank'
                rel='noreferrer'
            >
                github地址
            </a>
            <a
                href='https://beian.miit.gov.cn/#/Integrated/index'
                className={s.link}
                target='_blank'
                rel='noreferrer'
            >
                豫ICP备2023010346号
            </a>
        </Footer>
    );
};

export default CustomFooter;
