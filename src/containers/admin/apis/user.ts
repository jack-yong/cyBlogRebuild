import request from '@/containers/admin/utils/request';
import { UserInfo, userLoginCondition } from '../interfaces/account';
import { Response } from '@/containers/admin/interfaces/type';

export const login = async (condition: userLoginCondition): Promise<Response<UserInfo>> => {
    return (await request({ url: '/auth/login', method: 'POST', data: condition })).data;
};
