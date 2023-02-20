import {
    AppstoreOutlined,
    BookOutlined,
    FileAddOutlined,
    FileProtectOutlined,
    FileSyncOutlined,
    FolderOutlined,
    HomeOutlined,
    LinkOutlined,
    MailOutlined,
    MessageOutlined,
    PushpinOutlined,
    TagsOutlined,
    UserOutlined
} from '@ant-design/icons';
import React from 'react';
import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const BaseLayout = lazy(() => import('@/containers/admin/layouts'));
const Articles = lazy(() => import('@/containers/admin/pages/Articles'));
const Categories = lazy(() => import('@/containers/admin/pages/Categories'));
const Home = lazy(() => import('@/containers/admin/pages/Home'));
const Users = lazy(() => import('@/containers/admin/pages/Users'));
const Tags = lazy(() => import('@/containers/admin/pages/Tags'));
const Comments = lazy(() => import('@/containers/admin/pages/Comments'));
const Portfolio = lazy(() => import('@/containers/admin/pages/Portfolio'));
const Messages = lazy(() => import('@/containers/admin/pages/Messages'));
const Links = lazy(() => import('@/containers/admin/pages/Links'));
const Devlogs = lazy(() => import('@/containers/admin/pages/Devlogs'));
const Talks = lazy(() => import('@/containers/admin/pages/Talks'));

const routes: RouteObject[] = [
    {
        path: '/',
        element: <BaseLayout />,
        children: [
            {
                index: true,
                element: <Navigate to='/home' />
            },
            {
                path: '/home',
                element: <Home />,
                handle: {
                    title: '首页',
                    icon: <HomeOutlined />
                }
            },
            {
                path: '/articles',
                handle: {
                    title: '文章',
                    icon: <FileProtectOutlined />
                },
                children: [
                    {
                        path: '/articles/manager',
                        element: <Articles />,
                        handle: {
                            title: '管理',
                            icon: <FileSyncOutlined />
                        }
                    },
                    {
                        path: '/articles/add',
                        element: <Articles />,
                        handle: {
                            title: '新增',
                            icon: <FileAddOutlined />
                        }
                    }
                ]
            },
            {
                path: '/users',
                element: <Users />,
                handle: {
                    title: '用户管理',
                    icon: <UserOutlined />
                }
            },
            {
                path: '/categories',
                element: <Categories />,
                handle: {
                    title: '类别管理',
                    icon: <FolderOutlined />
                }
            },
            {
                path: '/tags',
                element: <Tags />,
                handle: {
                    title: '标签管理',
                    icon: <TagsOutlined />
                }
            },
            {
                path: '/talks',
                element: <Talks />,
                handle: {
                    title: '说说管理',
                    icon: <PushpinOutlined />
                }
            },
            {
                path: '/links',
                element: <Links />,
                handle: {
                    title: '友链管理',
                    icon: <LinkOutlined />
                }
            },
            {
                path: '/messages',
                element: <Messages />,
                handle: {
                    title: '留言板管理',
                    icon: <MailOutlined />
                }
            },
            {
                path: '/comments',
                element: <Comments />,
                handle: {
                    title: '评论管理',
                    icon: <MessageOutlined />
                }
            },
            {
                path: '/logs',
                element: <Devlogs />,
                handle: {
                    title: '开发日志管理',
                    icon: <BookOutlined />
                }
            },
            {
                path: '/portfolio',
                element: <Portfolio />,
                handle: {
                    title: '作品集管理',
                    icon: <AppstoreOutlined />
                }
            }
        ]
    },
    {
        path: '/login'
        // element: <Login />,
    }
];

export default routes;
