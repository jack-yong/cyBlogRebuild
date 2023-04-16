import React, { useEffect, useState } from 'react';
import { DynamicForm, configDataType, elementType } from '../../components/DynamicForm';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { useRequest, useSetState } from 'ahooks';
import { PageInfo } from '../../interfaces/type';
import {
    LinkTypeObj,
    linkCreateParams,
    linkModifyParams,
    linkType,
    linkbaseParams
} from '../../interfaces/link';
import { Button, Form, Popconfirm, Image, Tag, Divider } from 'antd';
import { addLink, fetchLinkInfo, modifyLink } from '../../apis/link';
import { FormColumnType, defaultformStyle, multiComposeColumn, switchFormType } from '../../utils';
import dayjs from 'dayjs';
import CreateModal from '../../components/CreateModal';
import { ModifyDrawer } from '../../components/ModifyDrawer';
import BaseTable from '../../components/BaseTable';
import { PlusOutlined } from '@ant-design/icons';

const PAGE_SIZE = 10;

const index: React.FC = () => {
    const [creFormColumn, setCreFormColumn] = useState<configDataType[]>([]);
    const [modFormColumn, setModFormColumn] = useState<configDataType[]>([]);
    const [searFormColumn, setSearFormColumn] = useState<configDataType[]>([]);
    //eslint-disable-next-line
    const [tableColumns, setTableColumns] = useState<ColumnsType[]>();
    const [creModVisiable, setCreModVisiable] = useState<boolean>(false);
    const [mdfDrwVisiable, setMdfDrwVisiable] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useState<linkbaseParams>();
    const [modifyItemInfo, setModifyItemInfo] = useState<linkModifyParams>();
    const [pageInfo, setPage] = useSetState<PageInfo>({
        page: 1,
        pageSize: PAGE_SIZE
    });

    const [form] = Form.useForm();

    const useLinkList = useRequest(fetchLinkInfo, {
        manual: true
    });

    const useLinkCreate = useRequest(addLink, {
        manual: true
    });

    const useLinkModify = useRequest(modifyLink, { manual: true });

    const linkMultiComposeColumn: multiComposeColumn[] = [
        {
            title: '友链图标',
            width: 100,
            dataIndex: 'linkAvater',
            formcolumn: {
                columnType: FormColumnType.modifyAndcreate,
                type: elementType.input,
                placeholder: '请输入友链图标地址'
            },
            render: text => {
                return <Image width={50} height={50} src={text} />;
            }
        },
        {
            title: '友链名称',
            width: 100,
            dataIndex: 'linkName',
            formcolumn: {
                columnType: FormColumnType.All,
                type: elementType.input,
                placeholder: '请输入友链名称'
            }
        },

        {
            title: '友链描述',
            width: 100,
            dataIndex: 'linkDescription',
            formcolumn: {
                columnType: FormColumnType.All,
                type: elementType.input,
                placeholder: '请输入友链描述'
            }
        },
        {
            title: '友链地址',
            width: 100,
            dataIndex: 'linkUrl',
            formcolumn: {
                columnType: FormColumnType.modifyAndcreate,
                type: elementType.input,
                placeholder: '请输入友链地址'
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
            title: '友链类型',
            width: 100,
            dataIndex: 'linkType',
            render: text => {
                if (text === linkType.friend) {
                    return <Tag color={'gold'}>{LinkTypeObj[linkType.friend]}</Tag>;
                } else if (text === linkType.recommend) {
                    return <Tag color={'cyan'}>{LinkTypeObj[linkType.recommend]}</Tag>;
                } else {
                    return <Tag color={'purple'}>{LinkTypeObj[linkType.tool]}</Tag>;
                }
            },
            formcolumn: {
                columnType: FormColumnType.All,
                type: elementType.select,
                placeholder: '请选择友链类型',
                list: [
                    {
                        label: LinkTypeObj[linkType.friend],
                        value: linkType.friend
                    },
                    {
                        label: LinkTypeObj[linkType.recommend],
                        value: linkType.recommend
                    },
                    {
                        label: LinkTypeObj[linkType.tool],
                        value: linkType.tool
                    }
                ]
            }
        },
        {
            title: '友链创建时间',
            width: 100,
            dataIndex: 'linkDate',
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
                            useDeleteLink(record.categoryId as string);
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
    const useFilterLink = async (fields: linkbaseParams) => {
        setSearchParams(fields);
        useLinkList.run({ ...pageInfo, ...fields });
    };

    const useCreateLink = async (fields: linkCreateParams) => {
        // console.log(fields, 'fieldsfields')
        useLinkCreate.run(fields);
        setCreModVisiable(false);
        setTimeout(() => {
            useLinkList.run({ ...pageInfo, ...searchParams });
        }, 300);
    };

    const userModfiyLink = async (fields: linkModifyParams) => {
        useLinkModify.run(fields, modifyItemInfo?.linkId as string);
        setTimeout(() => {
            useLinkList.run({ ...pageInfo, ...searchParams });
        });
    };

    const useDeleteLink = async (linkId: string) => {
        useLinkModify.run({ isDeleted: 0 }, linkId);
        setTimeout(() => {
            useLinkList.run({ ...pageInfo, ...searchParams });
        });
    };

    useEffect(() => {
        const { searchFormColumn, createFormColumn, modifyFormColumn, tableColumns } =
            switchFormType(linkMultiComposeColumn);
        setCreFormColumn(createFormColumn);
        setModFormColumn(modifyFormColumn);
        setSearFormColumn(searchFormColumn);
        setTableColumns(tableColumns as ColumnsType[]);
    }, []);

    useEffect(() => {
        useLinkList.run({ ...pageInfo, ...searchParams });
    }, [pageInfo]);

    return (
        <>
            <DynamicForm
                defalutform={form}
                configData={searFormColumn as configDataType[]}
                initialData={undefined}
                formStyle={defaultformStyle}
                buttonName={'搜索'}
                addOrModifyOrSearchService={useFilterLink}
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
                rowKey={'linkId'}
                loading={useLinkList.loading}
                total={useLinkList.data?.data.total as number}
                setPage={setPage}
                dataSource={useLinkList.data?.data.data}
                page={pageInfo}
            />
            <ModifyDrawer
                title={'友链信息修改'}
                buttonName={'修改'}
                open={mdfDrwVisiable}
                onClose={onCloseDrawer}
                drawerConfData={modFormColumn as configDataType[]}
                drawerData={modifyItemInfo}
                drawerStyle={defaultformStyle}
                setDrawerVisible={setMdfDrwVisiable}
                ModifyService={userModfiyLink}
            />
            <CreateModal
                visible={creModVisiable}
                title={'新建友链'}
                modalConfData={creFormColumn as configDataType[]}
                modalStyle={defaultformStyle}
                addService={useCreateLink}
                onCancelModal={setCreModVisiable}
            />
        </>
    );

    //关闭当前抽屉
    function onCloseDrawer() {
        setModifyItemInfo(undefined); //关闭抽屉清空数据
        setMdfDrwVisiable(false);
    }

    function modifyButton(record: linkModifyParams) {
        setModifyItemInfo(record);
        setMdfDrwVisiable(true);
    }
};

export default index;
