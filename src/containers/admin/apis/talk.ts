import {
    featchTalkCondition,
    queryAllTalkResponse,
    talkBase,
    talkCreateParams,
    talkModifyParams
} from '../interfaces/talk';
import { authVerify } from '../utils';
import request from '../utils/request';
import { Response } from '@/containers/admin/interfaces/type';

export const fetchTalkInfo = async (
    params: featchTalkCondition
): Promise<Response<queryAllTalkResponse>> => {
    return (await request({ url: '/dspeech/findAll', method: 'GET', params })).data;
};

export const addTalk = async (data: talkCreateParams): Promise<Response<talkBase>> => {
    return authVerify() || (await request({ url: '/dspeech/create', method: 'POST', data })).data;
};

export const modifyTalk = async (
    data: talkModifyParams,
    dspeechId: string
): Promise<Response<talkBase>> => {
    return (
        authVerify() ||
        (await request({ url: `/dspeech/update/${dspeechId}`, method: 'POST', data })).data
    );
};
