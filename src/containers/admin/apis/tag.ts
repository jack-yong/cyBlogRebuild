import {
    featchTagCondition,
    queryAllTagResponse,
    tagBase,
    tagCreateParams,
    tagModifyParams
} from '../interfaces/tag';
import { Response, listType } from '@/containers/admin/interfaces/type';
import request from '../utils/request';
import { authVerify } from '../utils';

export const fetchTagInfo = async (
    params: featchTagCondition
): Promise<Response<queryAllTagResponse>> => {
    return (await request({ url: '/tags/findAll', method: 'GET', params })).data;
};

export const addTag = async (data: tagCreateParams): Promise<Response<tagBase>> => {
    return authVerify() || (await request({ url: '/tags/create', method: 'POST', data })).data;
};

export const modifyTag = async (
    data: tagModifyParams,
    tagId: string
): Promise<Response<tagBase>> => {
    return (
        authVerify() || (await request({ url: `/tags/update/${tagId}`, method: 'POST', data })).data
    );
};

export const fetchTagList = async (): Promise<listType[]> => {
    const res = (await request({ url: '/tags/findAllTag', method: 'GET' })).data?.data;
    return res.map((item: tagBase) => {
        return {
            tagId: item.tagId,
            label: item.tagName,
            value: item.tagColor
        };
    });
};
