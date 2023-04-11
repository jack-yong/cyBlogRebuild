import { PageInfo, PageResponse } from './type';

export interface featchCategoryCondition extends PageInfo, Partial<categorybaseParams> {}

export interface queryAllCategoryResponse extends PageResponse {
    data: categoryBase[];
}

export interface categorybaseParams {
    categoryName: string;
}

export interface categoryCreateParams extends categorybaseParams {
    categoryIcon: string;
}

export interface categoryModifyParams extends Partial<categoryCreateParams> {
    categoryId?: string;
    isDeleted?: number;
    categoryRank?: number;
}

export interface categoryBase {
    categoryId: string;
    categoryName: string;
    categoryIcon: string;
    categoryRank: number;
    isDeleted: number;
    categoryCreateTime: string;
}
