import request from '@/utils/request';
import { Response } from '@/interface/common';
import { linkBase } from '../interfaces/link';
export const fetchLinkInfo = async (): Promise<Response<linkBase[]>> => {
    return (await request({ url: '/links/findAllData', method: 'GET' })).data;
};
