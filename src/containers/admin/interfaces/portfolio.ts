import { PageInfo, PageResponse } from './type';

export interface featchPortfolioCondition extends PageInfo, Partial<portfoliobaseParams> {}

export interface queryAllPortfolioResponse extends PageResponse {
    data: portfolioBase[];
}

export interface portfoliobaseParams {
    portfolioTitle: string;
    portfolioDescribe: string;
}

export interface portfolioCreateParams extends portfoliobaseParams {
    portfolioImgurl: string;
    portfolioUrl: string;
}

export interface portfolioModifyParams extends Partial<portfolioCreateParams> {
    portfolioId?: string;
    isDeleted?: number;
}

export interface portfolioBase {
    portfolioId: string;
    portfolioTitle: string;
    portfolioDescribe: string;
    portfolioImgurl: string;
    portfolioUrl: string;
    isDeleted: number;
    portfolioDate: Date;
}
