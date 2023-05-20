export interface tagBase {
    tagId: string;
    tagName: string;
    tagColor: string;
    isDeleted: number;
    tagCreateTime: Date;
}

export interface tagWithArticleNum {
    id: string;
    name: string;
    tagColor: string;
    value: number;
}
