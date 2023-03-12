import { MenuTheme } from 'antd';
import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

export interface ConfigProps {
    isCollapsed: boolean;
    theme: MenuTheme;
}

export const configStore = proxy<ConfigProps>({
    isCollapsed: false,
    theme: 'light'
});

devtools(configStore, { name: 'config', enabled: true });
