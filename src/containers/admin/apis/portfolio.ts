import { Response } from '@/containers/admin/interfaces/type';
import {
    featchPortfolioCondition,
    queryAllPortfolioResponse,
    portfolioCreateParams,
    portfolioBase,
    portfolioModifyParams
} from '../interfaces/portfolio';
import { authVerify } from '../utils';
import request from '../utils/request';

export const fetchPortfolioInfo = async (
    params: featchPortfolioCondition
): Promise<Response<queryAllPortfolioResponse>> => {
    return (await request({ url: '/portfolio/findAll', method: 'GET', params })).data;
};

export const addPortfolio = async (
    data: portfolioCreateParams
): Promise<Response<portfolioBase>> => {
    return authVerify() || (await request({ url: '/portfolio/create', method: 'POST', data })).data;
};

export const modifyPortfolio = async (
    data: portfolioModifyParams,
    portfolioId: string
): Promise<Response<portfolioBase>> => {
    return (
        authVerify() ||
        (await request({ url: `/portfolio/update/${portfolioId}`, method: 'POST', data })).data
    );
};
