import { PageInfo, PageResponse } from './type';

export interface featchMessageCondition extends PageInfo, Partial<messagebaseParams> {}

export interface queryAllMessageResponse extends PageResponse {
    data: messageBase[];
}

export interface messagebaseParams {
    lmrContent: string;
    isRead: number;
}

export interface messageCreateParams extends messagebaseParams {
    lmrAnswererId: string;
    lmrFatherid: string;
}

export interface messageModifyParams extends Partial<messageCreateParams> {
    lmrId?: string;
    isDeleted?: number;
}

export interface messageBase {
    lmrId: string;
    lmrAnswererId: string;
    lmrFatherid: string;
    lmrContent: string;
    isDeleted: number;
    isRead: number;
    lmrDate: Date;
}

export enum messageStatus {
    read = 0,
    unread = 1
}

export const messageTypeObj = {
    [messageStatus.read]: '已读',
    [messageStatus.unread]: '未读'
};
