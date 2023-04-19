import { ColumnType, ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { DynamicForm, configDataType, elementType } from '../../components/DynamicForm';
import { useRequest, useSetState } from 'ahooks';
import { talkbaseParams, talkCreateParams, talkModifyParams } from '../../interfaces/talk';
import { PageInfo } from '../../interfaces/type';
import { Button, Divider, Form, Image, Popconfirm } from 'antd';
import { fetchTalkInfo, addTalk, modifyTalk } from '../../apis/talk';
import { FormColumnType, defaultformStyle, multiComposeColumn, switchFormType } from '../../utils';
import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';
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
    const [searchParams, setSearchParams] = useState<talkbaseParams>();
    const [modifyItemInfo, setModifyItemInfo] = useState<talkModifyParams>();
    const [pageInfo, setPage] = useSetState<PageInfo>({
        page: 1,
        pageSize: PAGE_SIZE
    });

    const [form] = Form.useForm();

    const useTalkList = useRequest(fetchTalkInfo, {
        manual: true
    });

    const useTalkCreate = useRequest(addTalk, {
        manual: true
    });

    const useTalkModify = useRequest(modifyTalk, { manual: true });

    const talkMultiComposeColumn: multiComposeColumn[] = [
        {
            title: '说说配图',
            width: 100,
            dataIndex: 'dspeechPicsUrl',
            formcolumn: {
                columnType: FormColumnType.modifyAndcreate,
                type: elementType.input,
                placeholder: '请输入说说背景图片'
            },
            render: text => {
                return <Image width={50} height={50} src={text} />;
            }
        },
        {
            title: '说说内容',
            width: 100,
            dataIndex: 'dspeechContent',
            formcolumn: {
                columnType: FormColumnType.All,
                type: elementType.textarea,
                placeholder: '请输入说说内容'
            }
        },
        {
            title: '说说创建时间',
            width: 100,
            dataIndex: 'dspeechDate',
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
                        title='确定要删除该说说吗？'
                        onConfirm={() => {
                            useDeleteTalk(record as string);
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

    const useFilterTalk = async (fields: talkbaseParams) => {
        setSearchParams(fields);
        useTalkList.run({ ...pageInfo, ...fields });
    };

    const useCreateTalk = async (fields: talkCreateParams) => {
        // console.log(fields, 'fieldsfields')
        useTalkCreate.run(fields);
        setCreModVisiable(false);
        setTimeout(() => {
            useTalkList.run({ ...pageInfo, ...searchParams });
        }, 300);
    };

    const userModfiyTalk = async (fields: talkModifyParams) => {
        useTalkModify.run(fields, modifyItemInfo?.dspeechId as string);
        setTimeout(() => {
            useTalkList.run({ ...pageInfo, ...searchParams });
        });
    };

    const useDeleteTalk = async (dspeechId: string) => {
        useTalkModify.run({ isDeleted: 0 }, dspeechId);
        setTimeout(() => {
            useTalkList.run({ ...pageInfo, ...searchParams });
        });
    };

    useEffect(() => {
        const { searchFormColumn, createFormColumn, modifyFormColumn, tableColumns } =
            switchFormType(talkMultiComposeColumn);
        setCreFormColumn(createFormColumn);
        setModFormColumn(modifyFormColumn);
        setSearFormColumn(searchFormColumn);
        setTableColumns(tableColumns as ColumnsType[]);
    }, []);

    useEffect(() => {
        useTalkList.run({ ...pageInfo, ...searchParams });
    }, [pageInfo]);

    return (
        <>
            <DynamicForm
                defalutform={form}
                configData={searFormColumn as configDataType[]}
                initialData={undefined}
                formStyle={defaultformStyle}
                buttonName={'搜索'}
                addOrModifyOrSearchService={useFilterTalk}
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
                rowKey={'categoryId'}
                loading={useTalkList.loading}
                total={useTalkList.data?.data.total as number}
                setPage={setPage}
                dataSource={useTalkList.data?.data.data}
                page={pageInfo}
            />
            <ModifyDrawer
                title={'标签信息修改'}
                buttonName={'修改'}
                open={mdfDrwVisiable}
                onClose={onCloseDrawer}
                drawerConfData={modFormColumn as configDataType[]}
                drawerData={modifyItemInfo}
                drawerStyle={defaultformStyle}
                setDrawerVisible={setMdfDrwVisiable}
                ModifyService={userModfiyTalk}
            />
            <CreateModal
                visible={creModVisiable}
                title={'新建标签'}
                modalConfData={creFormColumn as configDataType[]}
                modalStyle={defaultformStyle}
                addService={useCreateTalk}
                onCancelModal={setCreModVisiable}
            />
        </>
    );

    //关闭当前抽屉
    function onCloseDrawer() {
        setModifyItemInfo(undefined); //关闭抽屉清空数据
        setMdfDrwVisiable(false);
    }

    function modifyButton(record: talkModifyParams) {
        setModifyItemInfo(record);
        setMdfDrwVisiable(true);
    }
};

export default index;
