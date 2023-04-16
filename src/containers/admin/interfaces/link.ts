import { PageInfo, PageResponse } from './type';

export interface featchLinkCondition extends PageInfo, Partial<linkbaseParams> {} // 用于查询友链的条件

export interface queryAllLinkResponse extends PageResponse {
    data: linkBase[];
}

export interface linkbaseParams {
    linkName: string;
    linkDescription: string;
    linkType: linkType;
}

export interface linkCreateParams extends linkbaseParams {
    linkUrl: string;
    linkAvater: string;
}

export interface linkModifyParams extends Partial<linkCreateParams> {
    linkId?: string;
    linkRank?: number;
    isDeleted?: number;
}

export interface linkBase {
    linkId: string;
    linkName: string;
    linkDescription: string;
    linkUrl: string;
    linkAvater: string;
    linkType: linkType;
    linkRank: number;
    isDeleted: number;
    linkDate: Date;
}

export enum linkType {
    friend = 0,
    recommend = 1,
    tool = 2
}

export const LinkTypeObj = {
    [linkType.friend]: '用户友链',
    [linkType.recommend]: '推荐网站',
    [linkType.tool]: '工具网站'
};
