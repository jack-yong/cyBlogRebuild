import { Drawer } from 'antd';
import { DynamicForm, FormStyle } from '../DynamicForm';
import type { configDataType } from '../DynamicForm';
import React from 'react';
// import { ExclamationCircleOutlined } from '@ant-design/icons';

export interface ModifyDrawer {
    buttonName: string;
    title: string;
    open: boolean;
    // eslint-disable-next-line
    onClose: Function;
    drawerConfData: configDataType[];
    // eslint-disable-next-line
    drawerData: any;
    drawerStyle?: FormStyle;
    drawerItemStyle?: FormStyle;
    // eslint-disable-next-line
    setDrawerVisible: Function;
    // eslint-disable-next-line
    ModifyService: Function;
}

export const ModifyDrawer: React.FC<ModifyDrawer> = props => {
    const {
        buttonName,
        title,
        open,
        onClose,
        drawerConfData,
        drawerData,
        drawerStyle,
        drawerItemStyle,
        setDrawerVisible,
        ModifyService
    } = props;

    // const onClickClose = () => {
    //     Modal.confirm({
    //         title: '确认',
    //         content: '是否确认关闭改抽屉？（页面编辑数据将不会保存!）',
    //         icon: <ExclamationCircleOutlined />,
    //         onOk: () => {

    //         }
    //     });
    // };
    return (
        <Drawer
            title={title}
            open={open}
            onClose={() => onClose()}
            width={'500px'}
            destroyOnClose={true} //关闭抽屉销毁内部元素
        >
            <DynamicForm
                buttonName={buttonName}
                configData={drawerConfData} //配置表单内容
                initialData={drawerData} //表单内容初始值
                formStyle={drawerStyle} //form样式
                formItemStyle={drawerItemStyle} //formitem样式
                setDrawerVisible={setDrawerVisible}
                addOrModifyOrSearchService={ModifyService}
                formLayout={'inline'}
            />
        </Drawer>
    );
};
