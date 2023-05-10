import { ArticleInfoType, ArticleType, calendarInfoType, homeIncfoType } from '../interfaces/home';
import request from '../utils/request';
import { Response } from '@/containers/admin/interfaces/type';
export const fetchHomeInfo = async (): Promise<Response<homeIncfoType[]>> => {
    return (await request({ url: '/blogs/fetchHomeInfo', method: 'GET' })).data;
};

export const fetchCalendarInfo = async (params: {
    year: string;
}): Promise<Response<calendarInfoType[]>> => {
    return (await request({ url: '/blogs/fetchCalendarInfo', method: 'GET', params })).data;
};

export const fetchArticleInfo = async (params: {
    type: ArticleType;
}): Promise<Response<ArticleInfoType>> => {
    return (await request({ url: '/blogs/fetchArticleInfo', method: 'GET', params })).data;
};
