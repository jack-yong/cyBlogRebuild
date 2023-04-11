import React, { useEffect, useState } from 'react';
import { DynamicForm, configDataType, elementType } from '../../components/DynamicForm';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { categoryModifyParams } from '../../interfaces/category';
import { PageInfo } from '../../interfaces/type';
import { useRequest, useSetState } from 'ahooks';
import { Button, Divider, Form, Popconfirm, Tag } from 'antd';
import { FormColumnType, defaultformStyle, multiComposeColumn, switchFormType } from '../../utils';
import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';
import BaseTable from '../../components/BaseTable';
import { ModifyDrawer } from '../../components/ModifyDrawer';
import CreateModal from '../../components/CreateModal';
import { addTag, fetchTagInfo, modifyTag } from '../../apis/tag';
import { tagbaseParams } from '../../interfaces/tag';
import { tagModifyParams } from '../../interfaces/tag';
import { tagCreateParams } from '../../interfaces/tag';

const PAGE_SIZE = 10;

const index: React.FC = () => {
    const [creFormColumn, setCreFormColumn] = useState<configDataType[]>([]);
    const [modFormColumn, setModFormColumn] = useState<configDataType[]>([]);
    const [searFormColumn, setSearFormColumn] = useState<configDataType[]>([]);
    //eslint-disable-next-line
    const [tableColumns, setTableColumns] = useState<ColumnsType[]>();
    const [creModVisiable, setCreModVisiable] = useState<boolean>(false);
    const [mdfDrwVisiable, setMdfDrwVisiable] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useState<tagbaseParams>();
    const [modifyItemInfo, setModifyItemInfo] = useState<tagModifyParams>();
    const [pageInfo, setPage] = useSetState<PageInfo>({
        page: 1,
        pageSize: PAGE_SIZE
    });

    const [form] = Form.useForm();

    const useTagList = useRequest(fetchTagInfo, {
        manual: true
    });

    const useTagCreate = useRequest(addTag, {
        manual: true
    });

    const useTagModify = useRequest(modifyTag, { manual: true });

    const tagMultiComposeColumn: multiComposeColumn[] = [
        {
            title: '标签名称',
            width: 100,
            dataIndex: 'tagName',
            formcolumn: {
                columnType: FormColumnType.All,
                type: elementType.input,
                placeholder: '请输入标签名'
            }
        },
        {
            title: '标签颜色',
            width: 100,
            dataIndex: 'tagColor',
            formcolumn: {
                columnType: FormColumnType.modifyAndcreate,
                type: elementType.colorInput,
                placeholder: '请选择标签颜色'
            },
            render: (text, record) => {
                return <Tag color={text}>{record.tagName}</Tag>;
            }
        },
        {
            title: '标签创建时间',
            width: 100,
            dataIndex: 'tagCreateTime',
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
                        title='确定要删除该标签吗？'
                        onConfirm={() => {
                            useTagDelete(record.categoryId as string);
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

    const useFilterTag = async (fields: tagbaseParams) => {
        setSearchParams(fields);
        useTagList.run({ ...pageInfo, ...fields });
    };

    const useCreateTag = async (fields: tagCreateParams) => {
        // console.log(fields, 'fieldsfields')
        useTagCreate.run(fields);
        setCreModVisiable(false);
        setTimeout(() => {
            useTagList.run({ ...pageInfo, ...searchParams });
        }, 300);
    };

    const userTagModfiy = async (fields: categoryModifyParams) => {
        useTagModify.run(fields, modifyItemInfo?.tagId as string);
        setTimeout(() => {
            useTagList.run({ ...pageInfo, ...searchParams });
        });
    };

    const useTagDelete = async (tagId: string) => {
        useTagModify.run({ isDeleted: 0 }, tagId);
        setTimeout(() => {
            useTagList.run({ ...pageInfo, ...searchParams });
        });
    };

    useEffect(() => {
        const { searchFormColumn, createFormColumn, modifyFormColumn, tableColumns } =
            switchFormType(tagMultiComposeColumn);
        setCreFormColumn(createFormColumn);
        setModFormColumn(modifyFormColumn);
        setSearFormColumn(searchFormColumn);
        setTableColumns(tableColumns as ColumnsType[]);
    }, []);

    useEffect(() => {
        useTagList.run({ ...pageInfo, ...searchParams });
    }, [pageInfo]);

    return (
        <>
            <DynamicForm
                defalutform={form}
                configData={searFormColumn as configDataType[]}
                initialData={undefined}
                formStyle={defaultformStyle}
                buttonName={'搜索'}
                addOrModifyOrSearchService={useFilterTag}
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
                loading={useTagList.loading}
                total={useTagList.data?.data.total as number}
                setPage={setPage}
                dataSource={useTagList.data?.data.data}
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
                ModifyService={userTagModfiy}
            />
            <CreateModal
                visible={creModVisiable}
                title={'新建标签'}
                modalConfData={creFormColumn as configDataType[]}
                modalStyle={defaultformStyle}
                addService={useCreateTag}
                onCancelModal={setCreModVisiable}
            />
        </>
    );

    //关闭当前抽屉
    function onCloseDrawer() {
        setModifyItemInfo(undefined); //关闭抽屉清空数据
        setMdfDrwVisiable(false);
    }

    function modifyButton(record: categoryModifyParams) {
        setModifyItemInfo(record);
        setMdfDrwVisiable(true);
    }
};

export default index;
