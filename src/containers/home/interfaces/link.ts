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
