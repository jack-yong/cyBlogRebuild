import React, { useEffect, useState } from 'react';
import {
    defaultformItemStyle,
    defaultformStyle,
    FormColumnType,
    multiComposeColumn,
    switchFormType,
    UserInfoObj,
    UserType
} from '@/containers/admin/utils/index';
import { Button, Divider } from 'antd';
import { configDataType, DynamicForm, elementType, FormStyle } from '../../components/DynamicForm';
import CreateModal from '../../components/CreateModal';
import { ColumnType } from 'antd/lib/table';
import { ModifyDrawer } from '../../components/ModifyDrawer';
import { PlusOutlined } from '@ant-design/icons';

// const userFormStyle: FormStyle = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 16 },

// };

// const userFormItemStyle: FormStyle = {
//     wrapperCol: { span: 48 },
// }

const Users: React.FC = () => {
    const [creFormColumn, setCreFormColumn] = useState<configDataType[]>([]);
    const [modFormColumn, setModFormColumn] = useState<configDataType[]>([]);
    const [searFormColumn, setSearFormColumn] = useState<configDataType[]>([]);
    //eslint-disable-next-line
    const [tabColumns, setTableColumns] = useState<ColumnType<any>[]>();
    const [creModVisiable, setCreModVisiable] = useState<boolean>(false);
    const [mdfDrwVisiable, setMdfDrwVisiable] = useState<boolean>(false);

    const userMultiComposeColumn: multiComposeColumn[] = [
        {
            title: '用户头像',
            width: 100,
            dataIndex: 'imageurl',
            key: 'imageurl',
            render: text => {
                return <img width={50} height={50} src={text} />;
            }
        },
        {
            title: '用户名',
            width: 100,
            dataIndex: 'username',
            key: 'username',
            sorter: true,
            formcolumn: {
                columnType: FormColumnType.All,
                type: elementType.input,
                placeholder: '请输入用户名'
            }
        },
        {
            title: '用户密码',
            width: 100,
            dataIndex: 'password',
            key: 'password',
            formcolumn: {
                columnType: FormColumnType.modifyAndcreate,
                type: elementType.input,
                placeholder: '请输入密码'
            }
        },
        {
            title: '用户邮箱',
            width: 100,
            dataIndex: 'email',
            key: 'email',
            formcolumn: {
                columnType: FormColumnType.All,
                type: elementType.input,
                placeholder: '请输入邮箱',

                rules: [
                    {
                        type: 'email',
                        message: '邮箱的格式不正确!'
                    }
                ]
            }
        },
        {
            title: '用户最近登录时间',
            width: 100,
            dataIndex: 'recentlandtime',
            key: 'recentlandtime',
            sorter: true
        },
        {
            title: '用户角色',
            width: 100,
            dataIndex: 'role',
            key: 'role',
            render: text => {
                if (text === UserType.User) {
                    return UserInfoObj[UserType.User];
                } else {
                    return UserInfoObj[UserType.Admin];
                }
            },
            formcolumn: {
                columnType: FormColumnType.All,
                type: elementType.select,
                list: [
                    {
                        label: UserInfoObj[UserType.User],
                        value: UserType.User
                    },
                    {
                        label: UserInfoObj[UserType.Admin],
                        value: UserType.Admin
                    }
                ]
            }
        },
        {
            title: '操作',
            width: 100,
            key: 'operation',
            fixed: 'right',
            render: () => (
                <>
                    <Button type='primary' size='small'>
                        修改
                    </Button>
                    <Button
                        type='primary'
                        size='small'
                        danger
                        style={{
                            marginLeft: '1rem'
                        }}
                    >
                        删除
                    </Button>
                </>
            )
        }
    ];

    useEffect(() => {
        const { searchFormColumn, createFormColumn, modifyFormColumn, tableColumns } =
            switchFormType(userMultiComposeColumn);
        setCreFormColumn(createFormColumn);
        setModFormColumn(modifyFormColumn);
        setSearFormColumn(searchFormColumn);
        setTableColumns(tableColumns);
    }, []);

    return (
        <>
            <DynamicForm
                configData={searFormColumn as configDataType[]}
                initialData={undefined}
                formStyle={defaultformStyle}
                buttonName={'搜索'}
                addOrModifyOrSearchService={() => console.log('')}
                formLayout={'inline'}
            />
            <Button
                type='primary'
                icon={<PlusOutlined />}
                style={{
                    margin: '15px 0',
                    background: '#1677ff',
                    borderRadius: '5px',
                    float: 'right',
                    clear: 'both'
                }}
                onClick={() => setCreModVisiable(true)}
            >
                新建
            </Button>
            <Divider />

            <ModifyDrawer
                title={'用户信息修改'}
                buttonName={'修改'}
                open={mdfDrwVisiable}
                onClose={() => console.log('')}
                drawerConfData={modFormColumn as configDataType[]}
                drawerData={[]}
                drawerStyle={defaultformStyle}
                drawerItemStyle={defaultformItemStyle}
                setDrawerVisible={setMdfDrwVisiable}
                ModifyService={() => {
                    console.log('modify drawer');
                }}
            />
            <CreateModal
                visible={creModVisiable}
                title={'新建用户'}
                modalConfData={creFormColumn as configDataType[]}
                modalStyle={defaultformStyle}
                addService={() => console.log('')}
                onCancelModal={setCreModVisiable}
            />
        </>
    );
};

export default Users;
