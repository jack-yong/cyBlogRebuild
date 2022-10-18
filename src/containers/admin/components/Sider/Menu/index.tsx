import React from 'react';
import { Menu } from 'antd';
import { NavLink as Link } from 'react-router-dom';
import {
    HomeOutlined,
    FileProtectOutlined,
    FileSyncOutlined,
    FileAddOutlined,
    UserOutlined,
    FolderOutlined,
    TagsOutlined,
    PushpinOutlined,
    LinkOutlined,
    MessageOutlined,
    // SettingOutlined,
    MailOutlined,
    AppstoreOutlined,
    BookOutlined
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import type { MenuTheme } from 'antd';

interface MenuProps {
    theme?: MenuTheme;
}

const index: React.FC<MenuProps> = ({ theme = 'light' }) => {
    const location = useLocation();
    const subMenukey = location.pathname.split('/')[1];
    return (
        <>
            <Menu
                theme={theme}
                mode='inline'
                defaultOpenKeys={[subMenukey && '/' + subMenukey]}
                selectedKeys={[location.pathname]}
                items={[
                    {
                        key: '/',
                        icon: <HomeOutlined />,
                        label: <Link to='/'>首页</Link>
                    },
                    {
                        key: '/article',
                        icon: <FileProtectOutlined />,
                        label: '文章',
                        children: [
                            {
                                key: '/article/manager',
                                icon: <FileSyncOutlined />,
                                label: <Link to='/article/manager'>管理</Link>
                            },
                            {
                                key: '/article/add',
                                icon: <FileAddOutlined />,
                                // name: '新增'
                                label: <Link to='/article/add'>新增</Link>
                            }
                        ]
                    },
                    {
                        key: '/users',
                        icon: <UserOutlined />,
                        // name: '用户管理'
                        label: <Link to='/users'>用户管理</Link>
                    },
                    {
                        key: '/categories',
                        icon: <FolderOutlined />,
                        // name: '类别管理'
                        label: <Link to='/categories'>类别管理</Link>
                    },
                    {
                        key: '/tags',
                        icon: <TagsOutlined />,
                        // name: '标签管理'
                        label: <Link to='/tags'>标签管理</Link>
                    },
                    {
                        key: '/talks',
                        icon: <PushpinOutlined />,
                        // name: '归档管理'
                        label: <Link to='/talks'>说说管理</Link>
                    },
                    {
                        key: '/links',
                        icon: <LinkOutlined />,
                        // name: '友链管理'
                        label: <Link to='/links'>友链管理</Link>
                    },
                    {
                        key: '/messages',
                        icon: <MailOutlined />,
                        // name: '留言板管理'
                        label: <Link to='/messages'>留言板管理</Link>
                    },
                    {
                        key: '/comments',
                        icon: <MessageOutlined />,
                        // name: '留言板管理'
                        label: <Link to='/comments'>评论管理</Link>
                    },
                    {
                        key: '/logs',
                        icon: <BookOutlined />,
                        // name: '留言板管理'
                        label: <Link to='/logs'>开发日志管理</Link>
                    },
                    {
                        key: '/portfolio',
                        icon: <AppstoreOutlined />,
                        // name: '留言板管理'
                        label: <Link to='/portfolio'>作品集管理</Link>
                    }
                ]}
            />
        </>
    );
};

export default index;
