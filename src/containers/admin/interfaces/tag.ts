import { PageInfo, PageResponse } from './type';

export interface featchTagCondition extends PageInfo, Partial<tagbaseParams> {}

export interface queryAllTagResponse extends PageResponse {
    data: tagBase[];
}

export interface tagbaseParams {
    tagName: string;
}

export interface tagCreateParams extends tagbaseParams {
    tagColor: string;
}

export interface tagModifyParams extends Partial<tagCreateParams> {
    tagId?: string;
    isDeleted?: number;
}

export interface tagBase {
    tagId: string;
    tagName: string;
    tagColor: string;
    isDeleted: number;
    tagCreateTime: Date;
}
