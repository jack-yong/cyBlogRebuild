import request from '@/containers/admin/utils/request';
import {
    UserInfo,
    createParamsType,
    featchUsersCondition,
    modifyParamsType,
    queryAllUserResponse,
    userBase,
    userLoginCondition
} from '../interfaces/account';
import { Response } from '@/containers/admin/interfaces/type';
import { isAdmin } from '../utils/auth';
import { message } from 'antd';

const adminStatus = isAdmin();

export const login = async (condition: userLoginCondition): Promise<Response<UserInfo>> => {
    return (await request({ url: '/auth/login', method: 'POST', data: condition })).data;
};

export const fetchUsersInfo = async (
    params: featchUsersCondition
): Promise<Response<queryAllUserResponse>> => {
    return (await request({ url: '/users/findAll', method: 'GET', params })).data;
};

export const createUser = async (data: createParamsType): Promise<Response<userBase>> => {
    if (!adminStatus) {
        message.info('游客无法创建🤣');
        return Promise.reject(new Error('游客无法创建!'));
    }
    return (await request({ url: '/auth/create', method: 'POST', data })).data;
};

export const modifyUser = async (
    data: modifyParamsType,
    userId: string
): Promise<Response<userBase>> => {
    if (!adminStatus) {
        message.info('游客无法修改🤣');
        return Promise.reject(new Error('游客无法修改!'));
    }
    return (await request({ url: `/users/update/${userId}`, method: 'POST', data })).data;
};
