export interface categoryBase {
    categoryId: string;
    categoryName: string;
    categoryIcon: string;
    categoryRank: number;
    isDeleted: number;
    categoryCreateTime: string;
}

export interface categoryWithArticleNum {
    id: string;
    name: string;
    value: number;
}
