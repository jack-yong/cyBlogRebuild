import type { MenuTheme } from 'antd';

export interface themeType {
    theme: MenuTheme;
    // eslint-disable-next-line
    setTheme?: any;
}

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

export enum IsDelete {
    Death = 0,
    Alive = 1
}

export type FnVoid = () => void;
