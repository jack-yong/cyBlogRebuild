import { pieDataProps } from '../pages/Home/usePieCharts';

export interface homeIncfoType {
    name: string;
    num: number;
    key: string;
}

export interface calendarInfoType {
    blogCreateTime: string;
    num: string;
}

export interface ArticleInfoType {
    data: pieDataProps[];
    type: string;
}

export enum ArticleType {
    tag = 0,
    category = 1
}
