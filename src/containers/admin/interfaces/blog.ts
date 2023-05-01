import { IsDelete } from './type';

export interface blogbaseParams {
    blogTitle: string;
}

export interface blogBase {
    blogId: string;
    blogTitle: string;
    blogSubUrl: string;
    blogCoverImage: string;
    blogContent: string;
    blogCategoryId: string;
    blogViews: number;
    blogLikes: number;
    blogStatus: BlogStatus;
    blogEnableComment: EnableComment;
    isDeleted: IsDelete;
    blogCreateTime: Date;
    blogUpdateTime: Date;
}

export enum BlogStatus {
    draft = 0,
    publish = 1
}

export enum EnableComment {
    able = 0,
    unable = 1
}
