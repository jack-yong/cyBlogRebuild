import request from '@/utils/request';
import { tagWithArticleNum } from '../interfaces/tag';
import { Response } from '@/interface/common';

export const fetchTagList = async (): Promise<Response<tagWithArticleNum[]>> => {
    return (await request({ url: '/tags/findAllTagWithArticleNum', method: 'GET' })).data;
};
