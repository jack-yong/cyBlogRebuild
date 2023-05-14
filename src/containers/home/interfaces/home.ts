import { PageResponse } from '@/interface/common';
import { categoryBase } from './category';
import { tagBase } from './tag';

export interface ArticleSnapshot {
    blogId: string;
    blogTitle: string;
    blogSubUrl: string;
    blogCoverImage: string;
    blogContent?: string;
    categoryInfo: categoryBase;
    blogViews: number;
    blogLikes: number;
    blogEnableComment: number;
    blogCreateTime: Date;
    blogUpdateTime: Date;
    blogSnapshotContent: string;
    TagInfo: tagBase[];
}

export interface queryArticleSnapshotResponse extends PageResponse {
    data: ArticleSnapshot[];
}

export interface homeDataType {
    key: string;
    num: number;
    name: string;
}
