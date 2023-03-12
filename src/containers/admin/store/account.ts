import { proxy, subscribe } from 'valtio';
import { devtools } from 'valtio/utils';
import { UserInfo } from '../interfaces/account';

export interface ConfigProps {
    userInfo: Partial<UserInfo>;
}

export const userInfoStore = proxy<ConfigProps>({
    userInfo: JSON.parse(localStorage.getItem('account') as string) || undefined
});

subscribe(userInfoStore, () => {
    console.log('state has changed to', userInfoStore.userInfo);
    localStorage.setItem('account', JSON.stringify(userInfoStore.userInfo));
});

devtools(userInfoStore, { name: 'account', enabled: true });
