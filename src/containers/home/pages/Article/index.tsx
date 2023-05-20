import React, { useEffect } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import s from './index.mod.scss';
import { fetchOneBlog } from '../../apis/home';
import { useRequest } from 'ahooks';
import { useLocation } from 'react-router-dom';
import {
    EyeOutlined,
    FieldTimeOutlined,
    FolderOutlined,
    LikeOutlined,
    TagsOutlined
} from '@ant-design/icons';
import { Divider, Spin, Tag } from 'antd';
import dayjs from 'dayjs';
const Article: React.FC = () => {
    const location = useLocation();
    const queryStr = location.pathname.split('/').pop();
    const blogId = queryStr !== 'article' ? queryStr : undefined;
    hljs.configure({
        classPrefix: 'hljs-'
        // languages: ['CSS', 'SCSS', 'HTML', 'JavaScript', 'TypeScript', 'Markdown']
    });
    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: code => hljs.highlightAuto(code).value,
        gfm: true, // 默认为true。 允许 Git Hub标准的markdown.
        breaks: true // 默认为false。 允许回车换行。该选项要求 gfm 为true。
        // smartLists: true, // 使用比原生markdown更时髦的列表
    });

    const useArticleDetial = useRequest(fetchOneBlog, { manual: true });

    const blogDetail = useArticleDetial.data?.data;

    useEffect(() => {
        blogId && useArticleDetial.run(blogId);
    }, []);

    return (
        <Spin spinning={useArticleDetial.loading}>
            {blogDetail && (
                <>
                    <div className={s.article}>
                        <div className={s.title}>{blogDetail.blogTitle}</div>
                        <div className={s.desc}>
                            <div className={s.descshowitem}>
                                <FieldTimeOutlined className={s.itemicon} />
                                {`Posted on ${dayjs(blogDetail.blogCreateTime).format(
                                    'YYYY-MM-DD HH:mm:ss'
                                )}`}
                            </div>
                            <Divider type='vertical' />
                            <div className={s.descshowitem}>
                                <FolderOutlined className={s.itemicon} />
                                <Tag key={blogDetail.categoryInfo.categoryId} color='blue'>
                                    {blogDetail.categoryInfo.categoryName}
                                </Tag>
                            </div>
                            <Divider type='vertical' />
                            <div className={s.descshowitem}>
                                <TagsOutlined className={s.itemicon} />
                                {blogDetail &&
                                    blogDetail.TagInfo.map(item => (
                                        <Tag
                                            color={item.tagColor}
                                            key={item.tagId}
                                            style={{ marginLeft: '2px' }}
                                        >
                                            {item.tagName}
                                        </Tag>
                                    ))}
                            </div>
                            <Divider type='vertical' />
                            <div className={s.descshowitem}>
                                <LikeOutlined className={s.itemicon} />
                                {blogDetail.blogLikes}
                            </div>
                            <div className={s.descshowitem}>
                                <EyeOutlined className={s.itemicon} />
                                {blogDetail.blogViews}
                            </div>
                        </div>
                        <Divider />
                        <div
                            className={s.detail}
                            dangerouslySetInnerHTML={{
                                __html: marked(blogDetail.blogContent || '').replace(
                                    /<pre>/g,
                                    "<pre class='hljs'>"
                                )
                            }}
                        ></div>
                    </div>
                </>
            )}
        </Spin>
    );
};

export default Article;
