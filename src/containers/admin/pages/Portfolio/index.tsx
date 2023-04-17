import React, { useEffect, useState } from 'react';
import {
    portfolioCreateParams,
    portfolioModifyParams,
    portfoliobaseParams
} from '../../interfaces/portfolio';
import { Button, Divider, Form, Popconfirm, Image } from 'antd';
import { FormColumnType, defaultformStyle, multiComposeColumn, switchFormType } from '../../utils';
import { DynamicForm, configDataType, elementType } from '../../components/DynamicForm';
import dayjs from 'dayjs';
import { ColumnType, ColumnsType } from 'antd/lib/table';
import { useRequest, useSetState } from 'ahooks';
import { PageInfo } from '../../interfaces/type';
import { addPortfolio, fetchPortfolioInfo, modifyPortfolio } from '../../apis/portfolio';
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
    const [searchParams, setSearchParams] = useState<portfoliobaseParams>();
    const [modifyItemInfo, setModifyItemInfo] = useState<portfolioModifyParams>();
    const [pageInfo, setPage] = useSetState<PageInfo>({
        page: 1,
        pageSize: PAGE_SIZE
    });

    const [form] = Form.useForm();

    const usePortfolioList = useRequest(fetchPortfolioInfo, {
        manual: true
    });

    const usePortfolioCreate = useRequest(addPortfolio, {
        manual: true
    });

    const usePortfolioModify = useRequest(modifyPortfolio, { manual: true });

    const portfolioMultiComposeColumn: multiComposeColumn[] = [
        {
            title: '作品封面',
            width: 100,
            dataIndex: 'portfolioImgurl',
            formcolumn: {
                columnType: FormColumnType.modifyAndcreate,
                type: elementType.input,
                placeholder: '请输入作品封面地址'
            },
            render: text => {
                return <Image width={50} height={50} src={text} />;
            }
        },
        {
            title: '作品名称',
            width: 100,
            dataIndex: 'portfolioTitle',
            formcolumn: {
                columnType: FormColumnType.All,
                type: elementType.input,
                placeholder: '请输入作品名称'
            }
        },
        {
            title: '作品地址',
            width: 100,
            dataIndex: 'portfolioUrl',
            formcolumn: {
                columnType: FormColumnType.modifyAndcreate,
                type: elementType.input,
                placeholder: '请输入作品地址'
            },
            render: text => {
                return (
                    <a href={text} target='_blank' rel='noreferrer'>
                        {text}
                    </a>
                );
            }
        },
        {
            title: '作品描述',
            width: 100,
            dataIndex: 'portfolioDescribe',
            formcolumn: {
                columnType: FormColumnType.modifyAndcreate,
                type: elementType.textarea,
                placeholder: '请输入作品描述'
            }
        },
        {
            title: '作品创建时间',
            width: 100,
            dataIndex: 'portfolioDate',
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
                        title='确定要删除该作品吗？'
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

    const useFilterPortfolio = async (fields: portfoliobaseParams) => {
        setSearchParams(fields);
        usePortfolioList.run({ ...pageInfo, ...fields });
    };

    const useCreatePortfolio = async (fields: portfolioCreateParams) => {
        // console.log(fields, 'fieldsfields')
        usePortfolioCreate.run(fields);
        setCreModVisiable(false);
        setTimeout(() => {
            usePortfolioList.run({ ...pageInfo, ...searchParams });
        }, 300);
    };

    const userModfiyPortfolio = async (fields: portfolioModifyParams) => {
        usePortfolioModify.run(fields, modifyItemInfo?.portfolioId as string);
        setTimeout(() => {
            usePortfolioList.run({ ...pageInfo, ...searchParams });
        });
    };

    const useTagDelete = async (portfolioId: string) => {
        usePortfolioModify.run({ isDeleted: 0 }, portfolioId);
        setTimeout(() => {
            usePortfolioList.run({ ...pageInfo, ...searchParams });
        });
    };

    useEffect(() => {
        const { searchFormColumn, createFormColumn, modifyFormColumn, tableColumns } =
            switchFormType(portfolioMultiComposeColumn);
        setCreFormColumn(createFormColumn);
        setModFormColumn(modifyFormColumn);
        setSearFormColumn(searchFormColumn);
        setTableColumns(tableColumns as ColumnsType[]);
    }, []);

    useEffect(() => {
        usePortfolioList.run({ ...pageInfo, ...searchParams });
    }, [pageInfo]);

    return (
        <>
            <DynamicForm
                defalutform={form}
                configData={searFormColumn as configDataType[]}
                initialData={undefined}
                formStyle={defaultformStyle}
                buttonName={'搜索'}
                addOrModifyOrSearchService={useFilterPortfolio}
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
                rowKey={'portfolioId'}
                loading={usePortfolioList.loading}
                total={usePortfolioList.data?.data.total as number}
                setPage={setPage}
                dataSource={usePortfolioList.data?.data.data}
                page={pageInfo}
            />
            <ModifyDrawer
                title={'作品信息修改'}
                buttonName={'修改'}
                open={mdfDrwVisiable}
                onClose={onCloseDrawer}
                drawerConfData={modFormColumn as configDataType[]}
                drawerData={modifyItemInfo}
                drawerStyle={defaultformStyle}
                setDrawerVisible={setMdfDrwVisiable}
                ModifyService={userModfiyPortfolio}
            />
            <CreateModal
                visible={creModVisiable}
                title={'新建作品'}
                modalConfData={creFormColumn as configDataType[]}
                modalStyle={defaultformStyle}
                addService={useCreatePortfolio}
                onCancelModal={setCreModVisiable}
            />
        </>
    );

    //关闭当前抽屉
    function onCloseDrawer() {
        setModifyItemInfo(undefined); //关闭抽屉清空数据
        setMdfDrwVisiable(false);
    }

    function modifyButton(record: portfolioModifyParams) {
        setModifyItemInfo(record);
        setMdfDrwVisiable(true);
    }
};

export default index;
