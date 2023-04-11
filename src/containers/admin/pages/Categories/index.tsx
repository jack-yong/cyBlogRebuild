import React, { useEffect, useState } from 'react';
import { DynamicForm, configDataType, elementType } from '../../components/DynamicForm';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { PageInfo } from '../../interfaces/type';
import { useRequest, useSetState } from 'ahooks';
import { Button, Divider, Form, Image, Popconfirm } from 'antd';
import { FormColumnType, defaultformStyle, multiComposeColumn, switchFormType } from '../../utils';
import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';
import BaseTable from '../../components/BaseTable';
import { ModifyDrawer } from '../../components/ModifyDrawer';
import CreateModal from '../../components/CreateModal';
import {
    categoryCreateParams,
    categoryModifyParams,
    categorybaseParams
} from '../../interfaces/category';
import { addCategory, fetchCategoryInfo, modifyCategory } from '../../apis/category';

const PAGE_SIZE = 10;

const Category: React.FC = () => {
    const [creFormColumn, setCreFormColumn] = useState<configDataType[]>([]);
    const [modFormColumn, setModFormColumn] = useState<configDataType[]>([]);
    const [searFormColumn, setSearFormColumn] = useState<configDataType[]>([]);
    //eslint-disable-next-line
    const [tableColumns, setTableColumns] = useState<ColumnsType[]>();
    const [creModVisiable, setCreModVisiable] = useState<boolean>(false);
    const [mdfDrwVisiable, setMdfDrwVisiable] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useState<categorybaseParams>();
    const [modifyItemInfo, setModifyItemInfo] = useState<categoryModifyParams>();
    const [pageInfo, setPage] = useSetState<PageInfo>({
        page: 1,
        pageSize: PAGE_SIZE
    });

    const [form] = Form.useForm();

    const useCategoryList = useRequest(fetchCategoryInfo, {
        manual: true
    });

    const useCategoryCreate = useRequest(addCategory, {
        manual: true
    });

    const useCategoryModify = useRequest(modifyCategory, { manual: true });

    const categoryMultiComposeColumn: multiComposeColumn[] = [
        {
            title: '类别图片',
            width: 100,
            dataIndex: 'categoryIcon',
            formcolumn: {
                columnType: FormColumnType.modifyAndcreate,
                type: elementType.input,
                placeholder: '请输入图片地址'
            },
            render: text => {
                return <Image width={50} height={50} src={text} />;
            }
        },
        {
            title: '类别名称',
            width: 100,
            dataIndex: 'categoryName',
            formcolumn: {
                columnType: FormColumnType.All,
                type: elementType.input,
                placeholder: '请输入类别名'
            }
        },
        {
            title: '类别排序',
            width: 100,
            dataIndex: 'categoryRank',
            formcolumn: {
                columnType: FormColumnType.modifyType,
                type: elementType.input,
                placeholder: '请输入类别排序数字'
            }
        },
        {
            title: '类别创建时间',
            width: 100,
            dataIndex: 'categoryCreateTime',
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
                        title='确定要删除该类别吗？'
                        onConfirm={() => {
                            useCategoryDelete(record.categoryId as string);
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

    const useFilterCategory = async (fields: categorybaseParams) => {
        setSearchParams(fields);
        useCategoryList.run({ ...pageInfo, ...fields });
    };

    const useCreateCategory = async (fields: categoryCreateParams) => {
        // console.log(fields, 'fieldsfields')
        useCategoryCreate.run(fields);
        setCreModVisiable(false);
        setTimeout(() => {
            useCategoryList.run({ ...pageInfo, ...searchParams });
        }, 300);
    };

    const userCategoryModfiy = async (fields: categoryModifyParams) => {
        useCategoryModify.run(fields, modifyItemInfo?.categoryId as string);
        setTimeout(() => {
            useCategoryList.run({ ...pageInfo, ...searchParams });
        });
    };

    const useCategoryDelete = async (categoryId: string) => {
        useCategoryModify.run({ isDeleted: 0 }, categoryId);
        setTimeout(() => {
            useCategoryList.run({ ...pageInfo, ...searchParams });
        });
    };

    useEffect(() => {
        const { searchFormColumn, createFormColumn, modifyFormColumn, tableColumns } =
            switchFormType(categoryMultiComposeColumn);
        setCreFormColumn(createFormColumn);
        setModFormColumn(modifyFormColumn);
        setSearFormColumn(searchFormColumn);
        setTableColumns(tableColumns as ColumnsType[]);
    }, []);

    useEffect(() => {
        useCategoryList.run({ ...pageInfo, ...searchParams });
    }, [pageInfo]);

    return (
        <>
            <DynamicForm
                defalutform={form}
                configData={searFormColumn as configDataType[]}
                initialData={undefined}
                formStyle={defaultformStyle}
                buttonName={'搜索'}
                addOrModifyOrSearchService={useFilterCategory}
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
                loading={useCategoryList.loading}
                total={useCategoryList.data?.data.total as number}
                setPage={setPage}
                dataSource={useCategoryList.data?.data.data}
                page={pageInfo}
            />
            <ModifyDrawer
                title={'类别信息修改'}
                buttonName={'修改'}
                open={mdfDrwVisiable}
                onClose={onCloseDrawer}
                drawerConfData={modFormColumn as configDataType[]}
                drawerData={modifyItemInfo}
                drawerStyle={defaultformStyle}
                setDrawerVisible={setMdfDrwVisiable}
                ModifyService={userCategoryModfiy}
            />
            <CreateModal
                visible={creModVisiable}
                title={'新建类别'}
                modalConfData={creFormColumn as configDataType[]}
                modalStyle={defaultformStyle}
                addService={useCreateCategory}
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

export default Category;
