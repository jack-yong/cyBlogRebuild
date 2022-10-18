import React from 'react';
import { Layout } from 'antd';
import s from './index.mod.scss';

const { Footer } = Layout;

const index: React.FC = () => {
    return <Footer className={s.footer}>cyongBlog后台管理界面</Footer>;
};

export default index;
