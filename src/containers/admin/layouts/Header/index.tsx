import React from 'react';
import { Dropdown, Layout, Menu, MenuProps, Switch } from 'antd';
import { modeMap, modeMapArr } from '@/containers/admin/utils/modeMap';
import { configStore } from '../../store';
import Icon from '@ant-design/icons';
import s from './index.mod.scss';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import avatarDefault from '@/containers/admin/assets/images/avatar.jpg';
import { useSnapshot } from 'valtio';
import { userInfoStore } from '../../store/account';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';

const { Header } = Layout;

const bodyStyle = window.document.getElementsByTagName('body')[0].style;

const index: React.FC = () => {
    const navigate = useNavigate();
    const { userInfo } = useSnapshot(userInfoStore);
    const menu = (
        <Menu
            items={[
                {
                    key: '/logout',
                    label: (
                        <>
                            <span
                                onClick={() => {
                                    logout();
                                    navigate('/login');
                                }}
                            >
                                退出登录
                            </span>
                        </>
                    )
                }
            ]}
        ></Menu>
    );
    const sunSvg = () => (
        <svg viewBox='0 0 1024 1024' width='1em' height='1em' fill='currentColor'>
            <path d='M512 320c-105.8 0-192 86.2-192 192s86.2 192 192 192 192-86.2 192-192-86.2-192-192-192z m492.8 161l-189.4-94.6 67-200.8c9-27.2-16.8-53-43.8-43.8l-200.8 67-94.8-189.6c-12.8-25.6-49.2-25.6-62 0l-94.6 189.4L185.4 141.6c-27.2-9-53 16.8-43.8 43.8l67 200.8-189.4 94.8c-25.6 12.8-25.6 49.2 0 62l189.4 94.6-67 201c-9 27.2 16.8 53 43.8 43.8l200.8-67 94.6 189.4c12.8 25.6 49.2 25.6 62 0l94.6-189.4 200.8 67c27.2 9 53-16.8 43.8-43.8l-67-200.8 189.4-94.6c26-13 26-49.4 0.4-62.2z m-311.8 212c-99.8 99.8-262.2 99.8-362 0-99.8-99.8-99.8-262.2 0-362 99.8-99.8 262.2-99.8 362 0 99.8 99.8 99.8 262.2 0 362z'></path>{' '}
        </svg>
    );

    const moonSVg = () => (
        <svg viewBox='0 0 1024 1024' width='1em' height='1em' fill='currentColor'>
            <path d='M566.422 1024c157.924 0 302.158-71.85 397.714-189.584 14.136-17.416-1.278-42.86-23.124-38.7-248.406 47.308-476.524-143.152-476.524-393.908 0-144.444 77.324-277.27 202.996-348.788 19.372-11.024 14.5-40.394-7.512-44.46A516.312 516.312 0 0 0 566.422 0c-282.618 0-512 229.022-512 512 0 282.618 229.022 512 512 512z'></path>
        </svg>
    );

    const SunIcon = (props: Partial<CustomIconComponentProps>) => (
        <Icon component={sunSvg} {...props} />
    );

    const MoonIcon = (props: Partial<CustomIconComponentProps>) => (
        <Icon component={moonSVg} {...props} />
    );

    function modeChange(checked: boolean) {
        const mode = Number(!checked);
        configStore.theme = checked ? 'light' : 'dark';
        for (const type of modeMapArr) {
            bodyStyle.setProperty(type, modeMap[type as keyof typeof modeMap][mode]);
        }
    }

    return (
        <Header className={s.header}>
            <div>
                <Dropdown overlay={menu}>
                    <img src={userInfo?.userinfo?.avatar || avatarDefault} className={s.avatar} />
                </Dropdown>
            </div>
            <Switch
                defaultChecked
                className={s.headerSwitch}
                onChange={checked => modeChange(checked)}
                checkedChildren={<SunIcon style={{ fontSize: '14px' }} />}
                unCheckedChildren={<MoonIcon style={{ color: 'white', fontSize: '14px' }} />}
            />
        </Header>
    );
};

export default index;
