export interface PageInfo {
    page: number;
    pageSize: number;
}

export interface PageResponse extends PageInfo {
    total: number;
}

export interface Response<T = unknown> {
    data: T;
    resCode: number;
    msg: string;
    timestamp: number;
}
