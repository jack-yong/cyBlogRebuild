import { portfolioBase } from '../interfaces/portfolio';
import request from '@/utils/request';
import { Response } from '@/interface/common';
export const fetchPortfolioInfo = async (): Promise<Response<portfolioBase[]>> => {
    return (await request({ url: '/portfolio/findAllData', method: 'GET' })).data;
};
