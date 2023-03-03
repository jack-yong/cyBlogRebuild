import { MenuTheme } from 'antd';
import { proxy, subscribe } from 'valtio';
import { devtools } from 'valtio/utils';
import { UserInfo } from '../interfaces/type';

export interface ConfigProps {
    isCollapsed: boolean;
    theme: MenuTheme;
    userInfo: Partial<UserInfo>;
}

export const configStore = proxy<ConfigProps>({
    isCollapsed: false,
    theme: 'light',
    userInfo: JSON.parse(localStorage.getItem('account') as string) || {}
});

subscribe(configStore.userInfo, () => {
    localStorage.setItem('account', JSON.stringify(configStore.userInfo));
});

devtools(configStore, { name: 'config', enabled: true });
