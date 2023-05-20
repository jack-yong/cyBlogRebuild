import {
    AppstoreOutlined,
    BookOutlined,
    ContainerOutlined,
    FolderOutlined,
    HomeOutlined,
    InfoOutlined,
    LinkOutlined,
    MessageOutlined,
    PushpinOutlined,
    SearchOutlined,
    TagsOutlined
} from '@ant-design/icons';
import React from 'react';
import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const BaseLayout = lazy(() => import('@/containers/home/layouts'));
const Category = lazy(() => import('@/containers/home/pages/Category'));
const Home = lazy(() => import('@/containers/home/pages/Home'));
const Article = lazy(() => import('@/containers/home/pages/Article'));
const About = lazy(() => import('@/containers/home/pages/About'));
const Devlog = lazy(() => import('@/containers/home/pages/Devlog'));
const Link = lazy(() => import('@/containers/home/pages/Link'));
const Message = lazy(() => import('@/containers/home/pages/Message'));
const Portfolio = lazy(() => import('@/containers/home/pages/Portfolio'));
const Search = lazy(() => import('@/containers/home/pages/Search'));
const Tag = lazy(() => import('@/containers/home/pages/Tag'));
const Talk = lazy(() => import('@/containers/home/pages/Talk'));

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
                path: '/article',
                handle: {
                    title: '文章',
                    icon: <ContainerOutlined />
                },
                children: [
                    {
                        path: '/article/category',
                        element: <Category />,
                        handle: {
                            title: '类别',
                            icon: <FolderOutlined />
                        }
                    },
                    {
                        path: '/article/category/:id',
                        element: <Category />,
                        handle: {
                            title: '类别',
                            disable: true
                        }
                    },
                    {
                        path: '/article/tag',
                        element: <Tag />,
                        handle: {
                            title: '标签',
                            icon: <TagsOutlined />
                        }
                    },
                    {
                        path: '/article/tag/:id',
                        element: <Tag />,
                        handle: {
                            title: '标签',
                            disable: true
                        }
                    },
                    {
                        path: '/article/search',
                        element: <Search />,
                        handle: {
                            title: '搜索',
                            icon: <SearchOutlined />
                        }
                    }
                ]
            },
            {
                path: '/article/:id',
                element: <Article />,
                handle: {
                    disable: true
                }
            },
            {
                path: '/devlog',
                element: <Devlog />,
                handle: {
                    title: '建站',
                    icon: <BookOutlined />
                }
            },
            {
                path: '/portfolio',
                element: <Portfolio />,
                handle: {
                    title: '作品',
                    icon: <AppstoreOutlined />
                }
            },
            {
                path: '/link',
                element: <Link />,
                handle: {
                    title: '友链',
                    icon: <LinkOutlined />
                }
            },
            {
                path: '/talk',
                element: <Talk />,
                handle: {
                    title: '说说',
                    icon: <PushpinOutlined />
                }
            },
            {
                path: '/message',
                element: <Message />,
                handle: {
                    title: '留言',
                    icon: <MessageOutlined />
                }
            },
            {
                path: '/about',
                element: <About />,
                handle: {
                    title: '关于',
                    icon: <InfoOutlined />
                }
            }
        ]
    }
];
export default routes;
