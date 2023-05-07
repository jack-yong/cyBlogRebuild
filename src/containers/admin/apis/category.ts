import {
    categoryBase,
    categoryCreateParams,
    categoryModifyParams,
    featchCategoryCondition,
    queryAllCategoryResponse
} from '../interfaces/category';
import { Response, listType } from '@/containers/admin/interfaces/type';
import request from '../utils/request';
import { authVerify } from '../utils';

export const fetchCategoryInfo = async (
    params: featchCategoryCondition
): Promise<Response<queryAllCategoryResponse>> => {
    return (await request({ url: '/categories/findAll', method: 'GET', params })).data;
};

export const addCategory = async (data: categoryCreateParams): Promise<Response<categoryBase>> => {
    return (
        authVerify() || (await request({ url: '/categories/create', method: 'POST', data })).data
    );
};

export const modifyCategory = async (
    data: categoryModifyParams,
    categoryId: string
): Promise<Response<categoryBase>> => {
    return (
        authVerify() ||
        (await request({ url: `/categories/update/${categoryId}`, method: 'POST', data })).data
    );
};

export const fetchCategoryList = async (): Promise<listType[]> => {
    const res = (await request({ url: '/categories/findAllCategory', method: 'GET' })).data?.data;
    return res.map((item: categoryBase) => {
        return {
            label: item.categoryName,
            value: item.categoryId
        };
    });
};
