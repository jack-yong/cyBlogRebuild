import request from '@/utils/request';
import { categoryWithArticleNum } from '../interfaces/category';
import { Response } from '@/interface/common';

export const fetchCategoryList = async (): Promise<Response<categoryWithArticleNum[]>> => {
    return (await request({ url: '/categories/getCategoryFollowsArticle', method: 'GET' })).data;
};
