import { MenuTheme } from 'antd';

export interface themeType {
    theme: MenuTheme;
    setTheme?: any;
}

export interface UserInfo {
    uid: number;
    name: string;
    token: string;
}
