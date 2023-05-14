import request from '@/utils/request';
import { queryArticleSnapshotResponse } from '../interfaces/home';
import { PageInfo, Response } from '@/interface/common';

export const fetchBlogSnapshot = async (
    params: PageInfo
): Promise<Response<queryArticleSnapshotResponse>> => {
    return (await request({ url: '/blogs/findAll', method: 'GET', params })).data;
};
