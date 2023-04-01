import { MenuTheme } from 'antd';

export interface themeType {
    theme: MenuTheme;
    setTheme?: any;
}

export interface Response<T = unknown> {
    data: T;
    resCode: number;
    msg: string;
    timestamp: number;
}

export type FnVoid = () => void;
