import React, { lazy, Suspense } from 'react';
import { Layout, Spin } from 'antd';
import ErrorBoundary from '../ErrorBoundary';
import { Route, Routes, Navigate } from 'react-router-dom';
import s from './index.mod.scss';

const { Content } = Layout;
const Articles = lazy(() => import('../../pages/Articles'));
const Categories = lazy(() => import('../../pages/Categories'));
const Home = lazy(() => import('../../pages/Home'));
const Users = lazy(() => import('../../pages/Users'));
const Tags = lazy(() => import('../../pages/Tags'));
const Comments = lazy(() => import('../../pages/Comments'));
const Portfolio = lazy(() => import('../../pages/Portfolio'));
const Messages = lazy(() => import('../../pages/Messages'));
const Links = lazy(() => import('../../pages/Links'));
const Devlogs = lazy(() => import('../../pages/Devlogs'));
const Talks = lazy(() => import('../../pages/Talks'));

const index: React.FC = () => {
    return (
        <Content className={s.content}>
            <ErrorBoundary>
                <Suspense fallback={<Spin style={{ margin: 'auto' }} size='large' />}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/article/manager' element={<Articles />} />
                        <Route path='/article/add' element={<Articles />} />
                        <Route path='/categories' element={<Categories />} />
                        <Route path='/tags' element={<Tags />} />
                        <Route path='/talks' element={<Talks />} />
                        <Route path='/links' element={<Links />} />
                        <Route path='/messages' element={<Messages />} />
                        <Route path='/logs' element={<Devlogs />} />
                        <Route path='/portfolio' element={<Portfolio />} />
                        <Route path='/users' element={<Users />} />
                        <Route path='/comments' element={<Comments />} />
                        <Route path='*' element={<Navigate to='/' replace />} />
                    </Routes>
                </Suspense>
            </ErrorBoundary>
        </Content>
    );
};

export default index;
