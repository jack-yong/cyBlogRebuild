import { Divider, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { DynamicForm, configDataType, elementType } from '../../components/DynamicForm';
import { defaultformStyle } from '../../utils';
import { BlogStatus, EnableComment, EnableCommentObj, blogStatusObj } from '../../interfaces/blog';
import { useLocation } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { fetchTagList } from '../../apis/tag';
import { fetchCategoryList } from '../../apis/category';
import MarkDown from '../../components/MarkDown';
import { addBlog, fetchOneBlog, modifyBlog } from '../../apis/article';

const Opreate = () => {
    const [form] = Form.useForm();
    const location = useLocation();

    const buttonName = location.pathname.includes('add') ? '添加' : '修改';
    const blogId = location.pathname.includes('add')
        ? undefined
        : location.pathname.split('/').pop();
    const [content, setContent] = useState('');

    const useTagList = useRequest(fetchTagList, {
        manual: true
    });

    const useCategoryList = useRequest(fetchCategoryList, {
        manual: true
    });

    const useBlogDetail = useRequest(fetchOneBlog, {
        manual: true
    });

    const useAddBlog = useRequest(addBlog, {
        manual: true
    });

    const useModifyBlog = useRequest(modifyBlog, {
        manual: true
    });

    const configData: configDataType[] = [
        {
            name: 'blogTitle',
            type: elementType.input,
            label: '文章标题',
            placeholder: '请输入文章标题'
        },
        {
            name: 'blogCategoryId',
            type: elementType.select,
            label: '文章类别',
            placeholder: '请选择文章类别',
            list: useCategoryList.data
        },
        {
            name: 'blogTags',
            type: elementType.multipleSelect,
            label: '文章标签',
            placeholder: '请选择文章标签',
            list: useTagList.data
        },
        {
            name: 'blogStatus',
            type: elementType.select,
            label: '文章状态',
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
        },
        {
            name: 'blogEnableComment',
            type: elementType.select,
            label: '评论状态',
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
    ];

    useEffect(() => {
        form.resetFields();
        setContent('');
        useTagList.run();
        useCategoryList.run();
        blogId && useBlogDetail.run(blogId);
    }, [location.pathname]);

    useEffect(() => {
        form.setFieldsValue(useBlogDetail.data?.data);
        setContent(useBlogDetail.data?.data.blogContent || '');
    }, [useBlogDetail.data]);

    const blogOpreateService = (props: any) => {
        // eslint-disable-next-line
        const { blogTags, ...rest } = props;
        const tagStrArr: string[] = [];
        // eslint-disable-next-line
        blogTags.map((item: any) => {
            tagStrArr.push(item.label);
        });
        console.log(blogTags, tagStrArr);
        if (blogId) {
            useModifyBlog.run(
                { ...rest, blogContent: content, blogTags: tagStrArr.join('&&') },
                blogId
            );
        } else {
            useAddBlog.run({ ...props, blogContent: content, blogTags: tagStrArr.join('&&') });
        }
        setContent('');
    };

    return (
        <>
            <DynamicForm
                defalutform={form}
                configData={configData}
                initialData={undefined}
                formStyle={defaultformStyle}
                buttonName={buttonName}
                addOrModifyOrSearchService={blogOpreateService}
                formLayout={'inline'}
            />
            <Divider orientation='left'>文章内容</Divider>
            <MarkDown content={content} setContent={setContent} />
        </>
    );
};

export default Opreate;
