import {
    featchMessageCondition,
    queryAllMessageResponse,
    messageCreateParams,
    messageBase,
    messageModifyParams
} from '../interfaces/message';
import { authVerify } from '../utils';
import request from '../utils/request';
import { Response } from '@/containers/admin/interfaces/type';

export const fetchMessageInfo = async (
    params: featchMessageCondition
): Promise<Response<queryAllMessageResponse>> => {
    return (await request({ url: '/lmr/findAll', method: 'GET', params })).data;
};

export const addMessage = async (data: messageCreateParams): Promise<Response<messageBase>> => {
    return authVerify() || (await request({ url: '/lmr/create', method: 'POST', data })).data;
};

export const modifyMessage = async (
    data: messageModifyParams,
    tagId: string
): Promise<Response<messageBase>> => {
    return (
        authVerify() || (await request({ url: `/lmr/update/${tagId}`, method: 'POST', data })).data
    );
};
