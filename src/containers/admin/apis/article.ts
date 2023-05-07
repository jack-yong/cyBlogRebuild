import { Response } from '@/containers/admin/interfaces/type';
import {
    blogBase,
    blogCreateParams,
    blogModifyParams,
    featchBlogCondition,
    queryAllBlogResponse
} from '../interfaces/blog';
import request from '../utils/request';
import { authVerify } from '../utils';

export const fetchBlogInfo = async (
    params: featchBlogCondition
): Promise<Response<queryAllBlogResponse>> => {
    return (await request({ url: '/blogs/findAll', method: 'GET', params })).data;
};

export const addBlog = async (data: blogCreateParams): Promise<Response<blogBase>> => {
    return authVerify() || (await request({ url: '/blogs/create', method: 'POST', data })).data;
};

export const modifyBlog = async (
    data: blogModifyParams,
    tagId: string
): Promise<Response<blogBase>> => {
    return (
        authVerify() ||
        (await request({ url: `/blogs/update/${tagId}`, method: 'POST', data })).data
    );
};

export const fetchOneBlog = async (blogId: string): Promise<Response<blogBase>> => {
    return authVerify() || (await request({ url: `/blogs/findOne/${blogId}`, method: 'GET' })).data;
};
