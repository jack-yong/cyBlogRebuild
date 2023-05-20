import request from '@/utils/request';
import { ArticleSnapshot, homeDataType, queryArticleSnapshotResponse } from '../interfaces/home';
import { Response, featchBlogCondition } from '@/interface/common';

export const fetchBlogSnapshot = async (
    params: featchBlogCondition
): Promise<Response<queryArticleSnapshotResponse>> => {
    return (await request({ url: '/blogs/findAll', method: 'GET', params })).data;
};

export const fetchBlogDataInfo = async (): Promise<Response<homeDataType[]>> => {
    return (await request({ url: '/blogs/fetchHomeData', method: 'GET' })).data;
};

export const fetchOneBlog = async (blogId: string): Promise<Response<ArticleSnapshot>> => {
    return (await request({ url: `/blogs/findDetail/${blogId}`, method: 'GET' })).data;
};
