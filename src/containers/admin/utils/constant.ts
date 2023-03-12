import { UserInfo } from '../interfaces/account';

export const vistorUserInfo: Partial<UserInfo> = {
    userinfo: {
        userId: '',
        userphone: null,
        password: '',
        email: '',
        avatar: '',
        nickname: '游客',
        role: 'visitor',
        recentlyLanched: new Date().toLocaleString(),
        isDelete: 1
    },
    token: ''
};
