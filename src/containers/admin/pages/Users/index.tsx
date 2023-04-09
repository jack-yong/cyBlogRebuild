import React, { useEffect, useState } from 'react';
import {
    defaultformStyle,
    FormColumnType,
    multiComposeColumn,
    switchFormType,
    UserInfoObj,
    UserType
} from '@/containers/admin/utils/index';
import { Button, Divider, Form, Image, Popconfirm } from 'antd';
import { configDataType, DynamicForm, elementType } from '../../components/DynamicForm';
import CreateModal from '../../components/CreateModal';
import { ColumnType, ColumnsType } from 'antd/lib/table';
import { ModifyDrawer } from '../../components/ModifyDrawer';
import { PlusOutlined } from '@ant-design/icons';
import BaseTable from '../../components/BaseTable';
import { useRequest, useSetState } from 'ahooks';
import { createUser, fetchUsersInfo, modifyUser } from '../../apis/user';
import { PageInfo } from '../../interfaces/type';
import dayjs from 'dayjs';
import { baseParamsType, createParamsType, modifyParamsType } from '../../interfaces/account';

// const userFormStyle: FormStyle = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 16 },

// };

// const userFormItemStyle: FormStyle = {
//     wrapperCol: { span: 48 },
// }

const PAGE_SIZE = 10;

export type searchParamsType = Partial<baseParamsType>;

const Users: React.FC = () => {
    const [creFormColumn, setCreFormColumn] = useState<configDataType[]>([]);
    const [modFormColumn, setModFormColumn] = useState<configDataType[]>([]);
    const [searFormColumn, setSearFormColumn] = useState<configDataType[]>([]);
    //eslint-disable-next-line
    const [tabColumns, setTableColumns] = useState<ColumnsType[]>();
    const [creModVisiable, setCreModVisiable] = useState<boolean>(false);
    const [mdfDrwVisiable, setMdfDrwVisiable] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useState<searchParamsType>({});
    const [modifyItemInfo, setModifyItemInfo] = useState<modifyParamsType>();
    const [pageInfo, setPage] = useSetState<PageInfo>({
        page: 1,
        pageSize: PAGE_SIZE
    });

    const [form] = Form.useForm();

    const useUserList = useRequest(fetchUsersInfo, {
        manual: true
    });

    const useUserCreate = useRequest(createUser, {
        manual: true
    });

    const userModifyUser = useRequest(modifyUser, {
        manual: true
    });

    const userMultiComposeColumn: multiComposeColumn[] = [
        {
            title: '用户头像',
            width: 100,
            dataIndex: 'avatar',
            formcolumn: {
                columnType: FormColumnType.modifyAndcreate,
                type: elementType.input,
                placeholder: '请输入头像地址'
            },
            render: text => {
                return <Image width={50} height={50} src={text} />;
            }
        },
        {
            title: '用户名',
            width: 100,
            dataIndex: 'nickname',
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
            title: '用户角色',
            width: 100,
            dataIndex: 'role',
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
                placeholder: '请选择用户类型',
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
            title: '用户最近登录时间',
            width: 100,
            dataIndex: 'recentlyLanched',
            // sorter: true
            formcolumn: {
                columnType: FormColumnType.modifyType,
                type: elementType.datePicker,
                placeholder: '选择日期'
            },
            render: text => {
                return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        {
            title: '操作',
            width: 100,
            key: 'operation',
            fixed: 'right',
            render: (text, record) => (
                <>
                    <Button
                        type='primary'
                        size='small'
                        onClick={() => {
                            modifyButton(record);
                        }}
                    >
                        修改
                    </Button>
                    <Popconfirm
                        placement='topRight'
                        title='确定要删除该用户吗？'
                        onConfirm={() => useUserDelete(record.userId)}
                        okText='Yes'
                        cancelText='No'
                    >
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
                    </Popconfirm>
                </>
            )
        }
    ];

    //eslint-disable-next-line
    const useFilterUser = async (fields: searchParamsType) => {
        setSearchParams(fields);
        useUserList.run({ ...pageInfo, ...fields });
    };

    const useCreateUser = async (fields: createParamsType) => {
        // console.log(fields, 'fieldsfields')
        useUserCreate.run(fields);
        setCreModVisiable(false);
        setTimeout(() => {
            useUserList.run({ ...pageInfo, ...searchParams });
        }, 300);
    };

    const userUserModfiy = async (fields: modifyParamsType) => {
        // eslint-disable-next-line
        const { userId, recentlyLanched, ...restInfo } = fields;
        const regularLanchedTime = dayjs(recentlyLanched).format('YYYY-MM-DD HH:mm:ss');
        userModifyUser.run(
            { recentlyLanched: regularLanchedTime, ...restInfo },
            modifyItemInfo?.userId as string
        );
        setTimeout(() => {
            useUserList.run({ ...pageInfo, ...searchParams });
        });
    };

    const useUserDelete = async (userId: string) => {
        userModifyUser.run({ isDelete: 0 }, userId);
        setTimeout(() => {
            useUserList.run({ ...pageInfo, ...searchParams });
        });
    };

    useEffect(() => {
        const { searchFormColumn, createFormColumn, modifyFormColumn, tableColumns } =
            switchFormType(userMultiComposeColumn);
        setCreFormColumn(createFormColumn);
        setModFormColumn(modifyFormColumn);
        setSearFormColumn(searchFormColumn);
        setTableColumns(tableColumns as ColumnsType[]);
    }, []);

    useEffect(() => {
        useUserList.run({ ...pageInfo, ...searchParams });
    }, [pageInfo]);

    return (
        <>
            <DynamicForm
                defalutform={form}
                configData={searFormColumn as configDataType[]}
                initialData={undefined}
                formStyle={defaultformStyle}
                buttonName={'搜索'}
                addOrModifyOrSearchService={useFilterUser}
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

            <BaseTable
                columns={tabColumns as ColumnType<any>[]}
                rowKey={'userId'}
                loading={useUserList.loading}
                total={useUserList.data?.data.total as number}
                setPage={setPage}
                dataSource={useUserList.data?.data.data}
                page={pageInfo}
            />
            <ModifyDrawer
                title={'用户信息修改'}
                buttonName={'修改'}
                open={mdfDrwVisiable}
                onClose={onCloseDrawer}
                drawerConfData={modFormColumn as configDataType[]}
                drawerData={modifyItemInfo}
                drawerStyle={defaultformStyle}
                setDrawerVisible={setMdfDrwVisiable}
                ModifyService={userUserModfiy}
            />
            <CreateModal
                visible={creModVisiable}
                title={'新建用户'}
                modalConfData={creFormColumn as configDataType[]}
                modalStyle={defaultformStyle}
                addService={useCreateUser}
                onCancelModal={setCreModVisiable}
            />
        </>
    );

    //关闭当前抽屉
    function onCloseDrawer() {
        setModifyItemInfo(undefined); //关闭抽屉清空数据
        setMdfDrwVisiable(false);
    }

    function modifyButton(record: modifyParamsType) {
        const { recentlyLanched, ...restInfo } = record;
        const regularLanchedTime = dayjs(recentlyLanched);
        setModifyItemInfo({ ...restInfo, recentlyLanched: regularLanchedTime });
        setMdfDrwVisiable(true);
    }
};

export default Users;
