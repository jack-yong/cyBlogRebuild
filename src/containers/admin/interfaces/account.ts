import { PageInfo, PageResponse } from './type';

export interface UserInfo {
    userinfo: userBase;
    token: string;
}

export interface queryAllUserResponse extends PageResponse {
    data: userBase[];
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

export interface baseParamsType {
    nickname: string;
    email: string;
    role: string;
}

export interface createParamsType extends baseParamsType {
    password: string;
}

export interface featchUsersCondition extends PageInfo, Partial<baseParamsType> {}

export interface modifyParamsType extends Partial<baseParamsType> {
    userId?: string;
    avatar?: string;
    isDelete?: number;
    //eslint-disable-next-line
    recentlyLanched?: any;
}
