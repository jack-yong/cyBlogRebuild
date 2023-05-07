import {
    devLogType,
    devlogBase,
    devlogCreateParams,
    devlogModifyParams,
    featchDevlogCondition,
    queryAllDevlogResponse
} from '../interfaces/devlog';
import { authVerify } from '../utils';
import request from '../utils/request';
import { Response } from '@/containers/admin/interfaces/type';

export const fetchDevlogInfo = async (
    params: featchDevlogCondition
): Promise<Response<queryAllDevlogResponse>> => {
    return (await request({ url: '/devlogs/findAll', method: 'GET', params })).data;
};

export const addDevlog = async (data: devlogCreateParams): Promise<Response<devLogType>> => {
    return authVerify() || (await request({ url: '/devlogs/create', method: 'POST', data })).data;
};

export const modifyDevlog = async (
    data: devlogModifyParams,
    devlogId: string
): Promise<Response<devlogBase>> => {
    return (
        authVerify() ||
        (await request({ url: `/devlogs/update/${devlogId}`, method: 'POST', data })).data
    );
};
