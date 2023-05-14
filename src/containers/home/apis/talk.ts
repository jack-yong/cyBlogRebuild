import request from '@/utils/request';
import { Response } from '@/interface/common';
import { talkBase } from '../interfaces/talk';

export const fetchTalkInfo = async (): Promise<Response<talkBase[]>> => {
    return (await request({ url: '/dspeech/findAllData', method: 'GET' })).data;
};
