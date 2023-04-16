import { PageInfo, PageResponse } from './type';

export interface featchDevlogCondition extends PageInfo, Partial<devlogbaseParams> {} // 用于查询日志的条件

export interface queryAllDevlogResponse extends PageResponse {
    data: devlogBase[];
}

export interface devlogbaseParams {
    dlTitle: string;
    dlType: devLogType;
}

export interface devlogCreateParams extends devlogbaseParams {
    dlContent: string;
}

export interface devlogModifyParams extends Partial<devlogCreateParams> {
    devlogId?: string;
    isDeleted?: number;
}

export interface devlogBase {
    devlogId: string;
    dlTitle: string;
    dlType: devLogType;
    dlContent: string;
    isDeleted: number;
    dlDate: Date;
}

export enum devLogType {
    feat = 0,
    fix = 1,
    refactor = 2,
    perf = 3
}

export const devLogTypeObj = {
    [devLogType.feat]: '添加新功能',
    [devLogType.fix]: '修复bug',
    [devLogType.refactor]: '项目重构',
    [devLogType.perf]: '性能优化'
};
