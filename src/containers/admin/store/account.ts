import { proxy, subscribe } from 'valtio';
import { devtools } from 'valtio/utils';
import { UserInfo } from '../interfaces/account';
import { localStorageUserInfoKey } from '../utils/auth';

export interface ConfigProps {
    userInfo: Partial<UserInfo>;
}

export const userInfoStore = proxy<ConfigProps>({
    userInfo: JSON.parse(localStorage.getItem(localStorageUserInfoKey) as string) || undefined
});

subscribe(userInfoStore, () => {
    console.log('state has changed to', userInfoStore.userInfo);
    localStorage.setItem(localStorageUserInfoKey, JSON.stringify(userInfoStore.userInfo));
});

devtools(userInfoStore, { name: localStorageUserInfoKey, enabled: true });
