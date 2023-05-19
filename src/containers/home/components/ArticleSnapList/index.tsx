import React from 'react';
import s from './index.mod.scss';
import { Divider, Spin, Tag } from 'antd';
import { ArticleSnapshot } from '../../interfaces/home';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { FieldTimeOutlined, FolderOutlined, TagsOutlined } from '@ant-design/icons';

interface IProps {
    articleData: ArticleSnapshot[];
    loading: boolean;
}

const index: React.FC<IProps> = ({ articleData, loading }) => {
    const navigate = useNavigate();
    return (
        <Spin spinning={loading}>
            <div className={s.articleList}>
                {articleData &&
                    articleData.map((item: ArticleSnapshot) => (
                        <div className={s.articleListItem} key={item.blogId}>
                            <span
                                className={s.title}
                                onClick={() => navigate(`/article/${item.blogId}`)}
                            >
                                {item.blogTitle}
                            </span>
                            <div className={s.descshow}>
                                <div className={s.descshowitem}>
                                    <FieldTimeOutlined className={s.itemicon} />

                                    {dayjs(item.blogCreateTime).format('YYYY-MM-DD HH:mm:ss')}
                                </div>
                                <Divider type='vertical' />
                                <div className={s.descshowitem}>
                                    <FolderOutlined className={s.itemicon} />
                                    <Tag key={item.categoryInfo.categoryId} color='blue'>
                                        {item.categoryInfo.categoryName}
                                    </Tag>
                                </div>
                                <Divider type='vertical' />
                                <div className={s.descshowitem}>
                                    <TagsOutlined className={s.itemicon} />
                                    {item.TagInfo &&
                                        item.TagInfo.map(titem => (
                                            <Tag
                                                color={titem.tagColor}
                                                key={titem.tagId}
                                                style={{ marginLeft: '2px' }}
                                            >
                                                {titem.tagName}
                                            </Tag>
                                        ))}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </Spin>
    );
};

export default index;
