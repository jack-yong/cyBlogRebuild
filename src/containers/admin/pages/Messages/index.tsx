import { useSetState, useRequest } from 'ahooks';
import { ColumnType, ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { fetchMessageInfo, addMessage, modifyMessage } from '../../apis/message';
import { DynamicForm, configDataType, elementType } from '../../components/DynamicForm';
import {
    messagebaseParams,
    messageCreateParams,
    messageModifyParams,
    messageStatus,
    messageTypeObj
} from '../../interfaces/message';
import { PageInfo } from '../../interfaces/type';
import { Button, Divider, Form, Popconfirm, Tag } from 'antd';
import { FormColumnType, defaultformStyle, multiComposeColumn, switchFormType } from '../../utils';
import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';
import BaseTable from '../../components/BaseTable';
import { ModifyDrawer } from '../../components/ModifyDrawer';
import CreateModal from '../../components/CreateModal';

const PAGE_SIZE = 10;

const index: React.FC = () => {
    const [creFormColumn, setCreFormColumn] = useState<configDataType[]>([]);
    const [modFormColumn, setModFormColumn] = useState<configDataType[]>([]);
    const [searFormColumn, setSearFormColumn] = useState<configDataType[]>([]);
    //eslint-disable-next-line
    const [tableColumns, setTableColumns] = useState<ColumnsType[]>();
    const [creModVisiable, setCreModVisiable] = useState<boolean>(false);
    const [mdfDrwVisiable, setMdfDrwVisiable] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useState<messagebaseParams>();
    const [modifyItemInfo, setModifyItemInfo] = useState<messageModifyParams>();
    const [pageInfo, setPage] = useSetState<PageInfo>({
        page: 1,
        pageSize: PAGE_SIZE
    });

    const [form] = Form.useForm();

    const useMessageList = useRequest(fetchMessageInfo, {
        manual: true
    });

    const useMessageCreate = useRequest(addMessage, {
        manual: true
    });

    const useMessageModify = useRequest(modifyMessage, { manual: true });

    const messageMultiComposeColumn: multiComposeColumn[] = [
        {
            title: '回复者id',
            width: 100,
            dataIndex: 'lmrAnswererId',
            formcolumn: {
                columnType: FormColumnType.modifyAndcreate,
                type: elementType.input,
                placeholder: '请输入回复者id'
            }
        },
        {
            title: '父消息id',
            width: 100,
            dataIndex: 'lmrFatherid',
            formcolumn: {
                columnType: FormColumnType.modifyAndcreate,
                type: elementType.input,
                placeholder: '请输入父消息id'
            }
        },
        {
            title: '留言内容',
            width: 100,
            dataIndex: 'lmrContent',
            // sorter: true
            formcolumn: {
                columnType: FormColumnType.All,
                type: elementType.textarea,
                placeholder: '请输入留言内容'
            }
        },
        {
            title: '是否已读',
            width: 100,
            dataIndex: 'isRead',
            // sorter: true
            formcolumn: {
                columnType: FormColumnType.All,
                type: elementType.select,
                placeholder: '选择留言状态',
                list: [
                    {
                        label: messageTypeObj[messageStatus.read],
                        value: messageStatus.read
                    },
                    {
                        label: messageTypeObj[messageStatus.unread],
                        value: messageStatus.unread
                    }
                ]
            },
            render: (text, record) => {
                if (text === messageStatus.read) {
                    return <Tag color={'success'}>{messageTypeObj[messageStatus.read]}</Tag>;
                } else {
                    return <Tag color={'warning'}>{messageTypeObj[messageStatus.unread]}</Tag>;
                }
            }
        },
        {
            title: '留言回复时间',
            width: 100,
            dataIndex: 'lmrDate',
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
                        title='确定要删除该留言吗？'
                        onConfirm={() => {
                            useDeleteMessage(record.lmrId as string);
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

    const useFilterMessage = async (fields: messagebaseParams) => {
        setSearchParams(fields);
        useMessageList.run({ ...pageInfo, ...fields });
    };

    const useCreateMessage = async (fields: messageCreateParams) => {
        // console.log(fields, 'fieldsfields')
        useMessageCreate.run(fields);
        setCreModVisiable(false);
        setTimeout(() => {
            useMessageList.run({ ...pageInfo, ...searchParams });
        }, 300);
    };

    const userModfiyMessage = async (fields: messageModifyParams) => {
        useMessageModify.run(fields, modifyItemInfo?.lmrId as string);
        setTimeout(() => {
            useMessageList.run({ ...pageInfo, ...searchParams });
        });
    };

    const useDeleteMessage = async (lmrId: string) => {
        useMessageModify.run({ isDeleted: 0 }, lmrId);
        setTimeout(() => {
            useMessageList.run({ ...pageInfo, ...searchParams });
        });
    };

    useEffect(() => {
        const { searchFormColumn, createFormColumn, modifyFormColumn, tableColumns } =
            switchFormType(messageMultiComposeColumn);
        setCreFormColumn(createFormColumn);
        setModFormColumn(modifyFormColumn);
        setSearFormColumn(searchFormColumn);
        setTableColumns(tableColumns as ColumnsType[]);
    }, []);

    useEffect(() => {
        useMessageList.run({ ...pageInfo, ...searchParams });
    }, [pageInfo]);

    return (
        <>
            <DynamicForm
                defalutform={form}
                configData={searFormColumn as configDataType[]}
                initialData={undefined}
                formStyle={defaultformStyle}
                buttonName={'搜索'}
                addOrModifyOrSearchService={useFilterMessage}
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
                columns={tableColumns as ColumnType<any>[]}
                rowKey={'lmrId'}
                loading={useMessageList.loading}
                total={useMessageList.data?.data.total as number}
                setPage={setPage}
                dataSource={useMessageList.data?.data.data}
                page={pageInfo}
            />
            <ModifyDrawer
                title={'留言信息修改'}
                buttonName={'修改'}
                open={mdfDrwVisiable}
                onClose={onCloseDrawer}
                drawerConfData={modFormColumn as configDataType[]}
                drawerData={modifyItemInfo}
                drawerStyle={defaultformStyle}
                setDrawerVisible={setMdfDrwVisiable}
                ModifyService={userModfiyMessage}
            />
            <CreateModal
                visible={creModVisiable}
                title={'新建标签'}
                modalConfData={creFormColumn as configDataType[]}
                modalStyle={defaultformStyle}
                addService={useCreateMessage}
                onCancelModal={setCreModVisiable}
            />
        </>
    );

    //关闭当前抽屉
    function onCloseDrawer() {
        setModifyItemInfo(undefined); //关闭抽屉清空数据
        setMdfDrwVisiable(false);
    }

    function modifyButton(record: messageModifyParams) {
        setModifyItemInfo(record);
        setMdfDrwVisiable(true);
    }
};

export default index;
