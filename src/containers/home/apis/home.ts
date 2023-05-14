import request from '@/utils/request';
import { homeDataType, queryArticleSnapshotResponse } from '../interfaces/home';
import { PageInfo, Response } from '@/interface/common';

export const fetchBlogSnapshot = async (
    params: PageInfo
): Promise<Response<queryArticleSnapshotResponse>> => {
    return (await request({ url: '/blogs/findAll', method: 'GET', params })).data;
};

export const fetchBlogDataInfo = async (): Promise<Response<homeDataType[]>> => {
    return (await request({ url: '/blogs/fetchHomeData', method: 'GET' })).data;
};
