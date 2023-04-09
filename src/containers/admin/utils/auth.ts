import { UserType } from '.';

export const localStorageUserInfoKey = '__auth_provider_userinfo__';

export const logout = async () => {
    window.localStorage.removeItem(localStorageUserInfoKey);
};

export const getUserInfo = () => {
    const userInfo = window.localStorage.getItem(localStorageUserInfoKey) || '{}';
    return JSON.parse(userInfo);
};

export const getToken = () => {
    const userInfo = getUserInfo();
    return userInfo.token;
};

export const isAdmin = () => {
    const { userinfo } = getUserInfo();
    console.log(userinfo, 'userInfouserInfouserInfo');
    return userinfo?.role === UserType.Admin;
};
