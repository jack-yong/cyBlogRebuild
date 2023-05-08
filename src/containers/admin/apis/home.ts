import { homeIncfoType } from '../interfaces/home';
import request from '../utils/request';
import { Response } from '@/containers/admin/interfaces/type';
export const fetchHomeInfo = async (): Promise<Response<homeIncfoType[]>> => {
    return (await request({ url: '/blogs/fetchHomeInfo', method: 'GET' })).data;
};
