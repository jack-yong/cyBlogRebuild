// import { PageResponse } from "@/interface/common";

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
