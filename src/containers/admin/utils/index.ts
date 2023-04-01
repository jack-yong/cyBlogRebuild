import type { ColumnType } from 'antd/lib/table';
import { configDataType, FormStyle } from '../components/DynamicForm';

export enum FormColumnType {
    searchType = 0,
    modifyType = 1,
    createType = 2,
    searchAndModify = 3,
    searchAndCreate = 4,
    modifyAndcreate = 5,
    All = 6
}

export const defaultformStyle: FormStyle = {
    wrapperCol: {},
    labelCol: {}
};
export const defaultformItemStyle: FormStyle = {
    wrapperCol: { span: 48 }
};

export interface formColumn extends Partial<configDataType> {
    columnType: FormColumnType;
}

//eslint-disable-next-line
export interface multiComposeColumn extends ColumnType<any> {
    formcolumn?: formColumn;
}

export enum UserType {
    User = 'user',
    Admin = 'admin'
}

export const UserInfoObj = {
    [UserType.User]: '普通用户',
    [UserType.Admin]: '管理员'
};

export function switchFormType(multiComposeColumns: multiComposeColumn[]) {
    const createFormColumn: configDataType[] = [];
    const modifyFormColumn: configDataType[] = [];
    const searchFormColumn: configDataType[] = [];
    //eslint-disable-next-line
    const tableColumns: ColumnType<any>[] = [];
    multiComposeColumns.map(item => {
        const { formcolumn, dataIndex, title, ...restMultiColumns } = item;
        if (formcolumn) {
            const { columnType, ...restFormColumn } = formcolumn;
            const currentColumnData = {
                ...(restFormColumn as configDataType),
                name: dataIndex as string,
                label: title as string
            };
            switch (columnType) {
                case FormColumnType.searchType:
                    searchFormColumn.push(currentColumnData);
                    break;
                case FormColumnType.createType:
                    createFormColumn.push(currentColumnData);
                    break;
                case FormColumnType.modifyType:
                    modifyFormColumn.push(currentColumnData);
                    break;
                case FormColumnType.searchAndModify:
                    searchFormColumn.push(currentColumnData);
                    modifyFormColumn.push(currentColumnData);
                    break;
                case FormColumnType.searchAndCreate:
                    searchFormColumn.push(currentColumnData);
                    createFormColumn.push(currentColumnData);
                    break;
                case FormColumnType.modifyAndcreate:
                    createFormColumn.push(currentColumnData);
                    modifyFormColumn.push(currentColumnData);
                    break;
                case FormColumnType.All:
                    searchFormColumn.push(currentColumnData);
                    createFormColumn.push(currentColumnData);
                    modifyFormColumn.push(currentColumnData);
                    break;
                default:
                    break;
            }
        } else {
            //eslint-disable-next-line
            tableColumns.push(restMultiColumns as ColumnType<any>);
        }
    });
    return { searchFormColumn, createFormColumn, modifyFormColumn, tableColumns };
}
