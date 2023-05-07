import { ColumnType, ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { DynamicForm, configDataType, elementType } from '../../components/DynamicForm';
import {
    BlogStatus,
    EnableComment,
    EnableCommentObj,
    blogStatusObj,
    blogbaseParams
} from '../../interfaces/blog';
import { fetchBlogInfo, modifyBlog } from '../../apis/article';
import { useRequest, useSetState } from 'ahooks';
import { Button, Divider, Form, Image, Popconfirm, Tag } from 'antd';
import { FormColumnType, defaultformStyle, multiComposeColumn, switchFormType } from '../../utils';
import { useNavigate } from 'react-router-dom';
import {
    CheckOutlined,
    FileProtectOutlined,
    FileTextOutlined,
    PlusOutlined,
    RocketOutlined
} from '@ant-design/icons';
import BaseTable from '../../components/BaseTable';
import dayjs from 'dayjs';
import { PageInfo } from '../../interfaces/type';
import { tagBase } from '../../interfaces/tag';

const PAGE_SIZE = 10;

const index: React.FC = () => {
    const navigate = useNavigate();
    const [searFormColumn, setSearFormColumn] = useState<configDataType[]>([]);
    //eslint-disable-next-line
    const [tableColumns, setTableColumns] = useState<ColumnsType[]>();
    const [searchParams, setSearchParams] = useState<blogbaseParams>();
    const [pageInfo, setPage] = useSetState<PageInfo>({
        page: 1,
        pageSize: PAGE_SIZE
    });
    const [form] = Form.useForm();

    const useBlogList = useRequest(fetchBlogInfo, {
        manual: true
    });
    const useBlogModify = useRequest(modifyBlog, { manual: true });

    const blogMultiComposeColumn: multiComposeColumn[] = [
        {
            title: '文章封面',
            width: 100,
            dataIndex: 'blogCoverImage',
            render: text => {
                return <Image width={50} height={50} src={text} />;
            }
        },
        {
            title: '文章标题',
            width: 100,
            dataIndex: 'blogTitle',
            formcolumn: {
                columnType: FormColumnType.searchType,
                type: elementType.input,
                placeholder: '请输入文章标题'
            }
        },
        {
            title: '文章地址',
            width: 100,
            dataIndex: 'blogSubUrl',
            render: text => {
                return (
                    <a href={text} target='_blank' rel='noreferrer'>
                        {text}
                    </a>
                );
            }
        },
        {
            title: '板块',
            width: 100,
            dataIndex: 'categoryInfo',
            // sorter: true
            render: categoryInfo => {
                return categoryInfo.categoryName;
            }
        },
        {
            title: '标签',
            width: 100,
            dataIndex: 'TagInfo',
            // sorter: true
            render: tagInfo => {
                return tagInfo.map((item: tagBase) => {
                    return (
                        <Tag
                            style={{ marginBottom: '0.5rem' }}
                            color={item.tagColor}
                            key={item.tagId}
                        >
                            {item.tagName}{' '}
                        </Tag>
                    );
                });
            }
        },
        {
            title: '阅读量',
            width: 100,
            dataIndex: 'blogViews'
            // sorter: true
        },
        {
            title: '点赞量',
            width: 100,
            dataIndex: 'blogLikes'
            // sorter: true
        },
        {
            title: '文章状态',
            width: 100,
            dataIndex: 'blogStatus',
            // sorter: true
            render: (text: BlogStatus) => {
                if (text === BlogStatus.draft) {
                    return (
                        <Tag color={'warning'} icon={<FileTextOutlined />}>
                            {blogStatusObj[BlogStatus.draft]}
                        </Tag>
                    );
                } else {
                    return (
                        <Tag color={'success'} icon={<FileProtectOutlined />}>
                            {blogStatusObj[BlogStatus.publish]}
                        </Tag>
                    );
                }
            },
            formcolumn: {
                columnType: FormColumnType.searchType,
                type: elementType.select,
                placeholder: '请选择文章状态',
                list: [
                    {
                        label: blogStatusObj[BlogStatus.draft],
                        value: BlogStatus.draft
                    },
                    {
                        label: blogStatusObj[BlogStatus.publish],
                        value: BlogStatus.publish
                    }
                ]
            }
        },
        {
            title: '评论状态',
            width: 100,
            dataIndex: 'blogEnableComment',
            // sorter: true
            render: (text: EnableComment) => {
                if (text === EnableComment.able) {
                    return (
                        <Tag color={'success'} icon={<CheckOutlined />}>
                            {EnableCommentObj[EnableComment.able]}
                        </Tag>
                    );
                } else {
                    return (
                        <Tag color={'warning'} icon={<RocketOutlined />}>
                            {EnableCommentObj[EnableComment.unable]}
                        </Tag>
                    );
                }
            },
            formcolumn: {
                columnType: FormColumnType.searchType,
                type: elementType.select,
                placeholder: '请选择评论状态',
                list: [
                    {
                        label: EnableCommentObj[EnableComment.able],
                        value: EnableComment.able
                    },
                    {
                        label: EnableCommentObj[EnableComment.unable],
                        value: EnableComment.unable
                    }
                ]
            }
        },
        {
            title: '创建时间',
            width: 100,
            dataIndex: 'blogCreateTime',
            // sorter: true
            render: text => {
                return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        {
            title: '更新时间',
            width: 100,
            dataIndex: 'blogUpdateTime',
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
                        onClick={() => navigate(`/articles/modify/${record.blogId}`)}
                    >
                        修改
                    </Button>
                    <Popconfirm
                        placement='topRight'
                        title='确定要删除该文章吗？'
                        onConfirm={() => {
                            useBlogDelete(record.blogId as string);
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

    const useFilterBlog = async (fields: blogbaseParams) => {
        setSearchParams(fields);
        useBlogList.run({ ...pageInfo, ...fields });
    };

    const useBlogDelete = async (blogId: string) => {
        useBlogModify.run({ isDeleted: 0 }, blogId);
        setTimeout(() => {
            useBlogList.run({ ...pageInfo, ...searchParams });
        }, 100);
    };

    useEffect(() => {
        const { searchFormColumn, tableColumns } = switchFormType(blogMultiComposeColumn);
        setSearFormColumn(searchFormColumn);
        setTableColumns(tableColumns as ColumnsType[]);
    }, []);

    useEffect(() => {
        useBlogList.run({ ...pageInfo, ...searchParams });
    }, [pageInfo]);
    return (
        <>
            <DynamicForm
                defalutform={form}
                configData={searFormColumn as configDataType[]}
                initialData={undefined}
                formStyle={defaultformStyle}
                buttonName={'搜索'}
                addOrModifyOrSearchService={useFilterBlog}
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
                onClick={() => navigate(`/articles/add`)}
            >
                新建
            </Button>
            <Divider />

            <BaseTable
                columns={tableColumns as ColumnType<any>[]}
                rowKey={'blogId'}
                loading={useBlogList.loading}
                total={useBlogList.data?.data.total as number}
                setPage={setPage}
                dataSource={useBlogList.data?.data.data}
                page={pageInfo}
            />
        </>
    );
};

export default index;
