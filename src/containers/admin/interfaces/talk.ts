import { PageInfo, PageResponse } from './type';

export interface featchTalkCondition extends PageInfo, Partial<talkbaseParams> {}

export interface queryAllTalkResponse extends PageResponse {
    data: talkBase[];
}

export interface talkbaseParams {
    dspeechContent: string;
}

export interface talkCreateParams extends talkbaseParams {
    dspeechPicsUrl: string;
}

export interface talkModifyParams extends Partial<talkCreateParams> {
    dspeechId?: string;
    isDeleted?: number;
}

export interface talkBase {
    dspeechId: string;
    dspeechContent: string;
    dspeechPicsUrl: string;
    isDeleted: number;
    dspeechDate: Date;
}
