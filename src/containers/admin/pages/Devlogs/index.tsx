import { useSetState, useRequest } from 'ahooks';
import type { ColumnType, ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { fetchDevlogInfo, addDevlog, modifyDevlog } from '../../apis/devlog';
import { DynamicForm, configDataType, elementType } from '../../components/DynamicForm';
import {
    devLogType,
    devLogTypeObj,
    devlogCreateParams,
    devlogModifyParams,
    devlogbaseParams
} from '../../interfaces/devlog';
import { PageInfo } from '../../interfaces/type';
import { Button, Divider, Form, Popconfirm, Tag } from 'antd';
import { FormColumnType, defaultformStyle, multiComposeColumn, switchFormType } from '../../utils';
import {
    BugOutlined,
    CheckOutlined,
    PlusOutlined,
    RedoOutlined,
    RocketOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import BaseTable from '../../components/BaseTable';
import CreateModal from '../../components/CreateModal';
import { ModifyDrawer } from '../../components/ModifyDrawer';

const PAGE_SIZE = 10;

const index: React.FC = () => {
    const [creFormColumn, setCreFormColumn] = useState<configDataType[]>([]);
    const [modFormColumn, setModFormColumn] = useState<configDataType[]>([]);
    const [searFormColumn, setSearFormColumn] = useState<configDataType[]>([]);
    //eslint-disable-next-line
    const [tableColumns, setTableColumns] = useState<ColumnsType[]>();
    const [creModVisiable, setCreModVisiable] = useState<boolean>(false);
    const [mdfDrwVisiable, setMdfDrwVisiable] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useState<devlogbaseParams>();
    const [modifyItemInfo, setModifyItemInfo] = useState<devlogModifyParams>();
    const [pageInfo, setPage] = useSetState<PageInfo>({
        page: 1,
        pageSize: PAGE_SIZE
    });

    const [form] = Form.useForm();

    const useDevlogList = useRequest(fetchDevlogInfo, {
        manual: true
    });

    const useDevlogCreate = useRequest(addDevlog, {
        manual: true
    });

    const useDevlogModify = useRequest(modifyDevlog, { manual: true });

    const devlogMultiComposeColumn: multiComposeColumn[] = [
        {
            title: '日志标题',
            width: 100,
            dataIndex: 'dlTitle',
            formcolumn: {
                columnType: FormColumnType.All,
                type: elementType.input,
                placeholder: '请输入日志标题'
            }
        },
        {
            title: '日志类型',
            width: 100,
            dataIndex: 'dlType',
            render: (text: devLogType) => {
                if (text === devLogType.feat) {
                    return (
                        <Tag color={'success'} icon={<CheckOutlined />}>
                            {devLogTypeObj[devLogType.feat]}
                        </Tag>
                    );
                } else if (text === devLogType.fix) {
                    return (
                        <Tag color={'error'} icon={<BugOutlined />}>
                            {devLogTypeObj[devLogType.fix]}
                        </Tag>
                    );
                } else if (text === devLogType.refactor) {
                    return (
                        <Tag color={'processing'} icon={<RedoOutlined />}>
                            {devLogTypeObj[devLogType.refactor]}
                        </Tag>
                    );
                } else {
                    return (
                        <Tag color={'warning'} icon={<RocketOutlined />}>
                            {devLogTypeObj[devLogType.perf]}
                        </Tag>
                    );
                }
            },
            formcolumn: {
                columnType: FormColumnType.All,
                type: elementType.select,
                placeholder: '请选择日志类型',
                list: [
                    {
                        label: devLogTypeObj[devLogType.feat],
                        value: devLogType.feat
                    },
                    {
                        label: devLogTypeObj[devLogType.fix],
                        value: devLogType.fix
                    },
                    {
                        label: devLogTypeObj[devLogType.refactor],
                        value: devLogType.refactor
                    },
                    {
                        label: devLogTypeObj[devLogType.perf],
                        value: devLogType.perf
                    }
                ]
            }
        },
        {
            title: '日志内容',
            width: 100,
            dataIndex: 'dlContent',
            formcolumn: {
                columnType: FormColumnType.modifyAndcreate,
                type: elementType.textarea,
                placeholder: '请输入日志内容'
            }
        },
        {
            title: '日志创建时间',
            width: 100,
            dataIndex: 'dlDate',
            // sorter: true
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
                        title='确定要删除该链接吗？'
                        onConfirm={() => {
                            useDeleteDevlog(record.categoryId as string);
                        }}
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
    const useFilterDevlog = async (fields: devlogbaseParams) => {
        setSearchParams(fields);
        useDevlogList.run({ ...pageInfo, ...fields });
    };

    const useCreateDevlog = async (fields: devlogCreateParams) => {
        // console.log(fields, 'fieldsfields')
        useDevlogCreate.run(fields);
        setCreModVisiable(false);
        setTimeout(() => {
            useDevlogList.run({ ...pageInfo, ...searchParams });
        }, 300);
    };

    const userModfiyDevlog = async (fields: devlogModifyParams) => {
        useDevlogModify.run(fields, modifyItemInfo?.devlogId as string);
        setTimeout(() => {
            useDevlogList.run({ ...pageInfo, ...searchParams });
        });
    };

    const useDeleteDevlog = async (devlogId: string) => {
        useDevlogModify.run({ isDeleted: 0 }, devlogId);
        setTimeout(() => {
            useDevlogList.run({ ...pageInfo, ...searchParams });
        });
    };

    useEffect(() => {
        const { searchFormColumn, createFormColumn, modifyFormColumn, tableColumns } =
            switchFormType(devlogMultiComposeColumn);
        setCreFormColumn(createFormColumn);
        setModFormColumn(modifyFormColumn);
        setSearFormColumn(searchFormColumn);
        setTableColumns(tableColumns as ColumnsType[]);
    }, []);

    useEffect(() => {
        useDevlogList.run({ ...pageInfo, ...searchParams });
    }, [pageInfo]);

    return (
        <>
            <DynamicForm
                defalutform={form}
                configData={searFormColumn as configDataType[]}
                initialData={undefined}
                formStyle={defaultformStyle}
                buttonName={'搜索'}
                addOrModifyOrSearchService={useFilterDevlog}
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
                // eslint-disable-next-line
                columns={tableColumns as ColumnType<any>[]}
                rowKey={'devlogId'}
                loading={useDevlogList.loading}
                total={useDevlogList.data?.data.total as number}
                setPage={setPage}
                dataSource={useDevlogList.data?.data.data}
                page={pageInfo}
            />
            <ModifyDrawer
                title={'日志信息修改'}
                buttonName={'修改'}
                open={mdfDrwVisiable}
                onClose={onCloseDrawer}
                drawerConfData={modFormColumn as configDataType[]}
                drawerData={modifyItemInfo}
                drawerStyle={defaultformStyle}
                setDrawerVisible={setMdfDrwVisiable}
                ModifyService={userModfiyDevlog}
            />
            <CreateModal
                visible={creModVisiable}
                title={'新建日志'}
                modalConfData={creFormColumn as configDataType[]}
                modalStyle={defaultformStyle}
                addService={useCreateDevlog}
                onCancelModal={setCreModVisiable}
            />
        </>
    );

    //关闭当前抽屉
    function onCloseDrawer() {
        setModifyItemInfo(undefined); //关闭抽屉清空数据
        setMdfDrwVisiable(false);
    }

    function modifyButton(record: devlogModifyParams) {
        setModifyItemInfo(record);
        setMdfDrwVisiable(true);
    }
};

export default index;
