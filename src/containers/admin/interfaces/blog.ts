import { categoryBase } from './category';
import { tagBase } from './tag';
import { IsDelete } from './type';
import { PageInfo, PageResponse } from './type';

export interface featchBlogCondition extends PageInfo, Partial<blogbaseParams> {} // 用于查询友链的条件

export interface queryAllBlogResponse extends PageResponse {
    data: blogBase[];
}

export interface blogbaseParams {
    blogTitle: string;
    blogCategoryId: string;
    blogStatus: BlogStatus;
}

export interface blogCreateParams extends blogbaseParams {
    blogCoverImage?: string;
    blogContent: string;
}

export interface blogModifyParams extends Partial<blogCreateParams> {
    blogId?: string;
    isDeleted?: number;
    blogViews?: number;
    blogLikes?: number;
    blogEnableComment?: EnableComment;
    blogUpdateTime?: Date;
    blogTags?: string;
}

export interface blogBase {
    blogId: string;
    blogTitle: string;
    blogSubUrl: string;
    blogCoverImage: string;
    blogContent?: string;
    categoryInfo: categoryBase;
    blogViews: number;
    blogLikes: number;
    blogStatus: BlogStatus;
    blogEnableComment: EnableComment;
    isDeleted: IsDelete;
    blogCreateTime: Date;
    blogUpdateTime: Date;
    tagInfo: tagBase[];
}

export enum BlogStatus {
    draft = 0,
    publish = 1
}

export enum EnableComment {
    able = 0,
    unable = 1
}

export const blogStatusObj = {
    [BlogStatus.draft]: '草稿',
    [BlogStatus.publish]: '发布'
};

export const EnableCommentObj = {
    [EnableComment.able]: '允许评论',
    [EnableComment.unable]: '不允许评论'
};
