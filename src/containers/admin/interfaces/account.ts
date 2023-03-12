export interface UserInfo {
    userinfo: userBase;
    token: string;
}

export interface userBase {
    userId: string;
    userphone: number | null;
    password: string;
    email: string;
    avatar: string;
    nickname: string;
    role: string;
    recentlyLanched: string;
    isDelete: number;
}

export interface userLoginCondition {
    email: string;
    password: string;
}
