import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Header from '@/containers/admin/layouts/Header';
import Content from '@/containers/admin/layouts/Content';
import Footer from '@/containers/admin/layouts/Footer';
import Sider from './Sider';
import { userInfoStore } from '../store/account';
import { useSnapshot } from 'valtio';
import s from './index.mod.scss';
import { useNavigate } from 'react-router-dom';

const baseLayout: React.FC = () => {
    const navigate = useNavigate();
    const userInfoSnapshot = useSnapshot(userInfoStore);

    useEffect(() => {
        if (!userInfoSnapshot.userInfo) {
            navigate('/login');
        }
    }, [userInfoStore.userInfo]);

    return (
        <Layout className={s.adminContainer}>
            <Sider />
            <Layout className={s.layout}>
                <Header />
                <Content />
                <Footer />
            </Layout>
        </Layout>
    );
};

export default baseLayout;
