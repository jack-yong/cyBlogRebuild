import {
    featchLinkCondition,
    linkBase,
    linkCreateParams,
    linkModifyParams
} from '../interfaces/link';
import { Response } from '@/containers/admin/interfaces/type';
import { queryAllTagResponse } from '../interfaces/tag';
import request from '../utils/request';
import { authVerify } from '../utils';

export const fetchLinkInfo = async (
    params: featchLinkCondition
): Promise<Response<queryAllTagResponse>> => {
    return (await request({ url: '/links/findAll', method: 'GET', params })).data;
};

export const addLink = async (data: linkCreateParams): Promise<Response<linkBase>> => {
    return authVerify() || (await request({ url: '/links/create', method: 'POST', data })).data;
};

export const modifyLink = async (
    data: linkModifyParams,
    linkId: string
): Promise<Response<linkBase>> => {
    return (
        authVerify() ||
        (await request({ url: `/links/update/${linkId}`, method: 'POST', data })).data
    );
};
