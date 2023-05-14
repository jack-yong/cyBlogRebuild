import request from '@/utils/request';
import { devlogBase } from '../interfaces/devlog';
import { Response } from '@/interface/common';

export const fetchDevlogInfo = async (): Promise<Response<devlogBase[]>> => {
    return (await request({ url: '/devlogs/findAllData', method: 'GET' })).data;
};
