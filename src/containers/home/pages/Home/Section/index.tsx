import React, { useEffect } from 'react';
import s from './index.mod.scss';
import { Divider, List, Space, Tag } from 'antd';
import {
    EyeOutlined,
    FieldTimeOutlined,
    FolderOutlined,
    LikeOutlined,
    MessageOutlined,
    TagsOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useRequest, useSetState } from 'ahooks';
import { fetchBlogSnapshot } from '@/containers/home/apis/home';
import { PageInfo } from '@/interface/common';
import { ArticleSnapshot } from '@/containers/home/interfaces/home';
import { categoryBase } from '@/containers/home/interfaces/category';
import { tagBase } from '@/containers/home/interfaces/tag';
import dayjs from 'dayjs';
import defaultImage from '@/containers/home/assets/images/defaultImage.png';

const PAGE_SIZE = 6;

const index: React.FC = () => {
    const navigate = useNavigate();

    const [pageInfo, setPage] = useSetState<PageInfo>({
        page: 1,
        pageSize: PAGE_SIZE
    });

    const useBlogSnapshot = useRequest(fetchBlogSnapshot, { manual: true });

    const blogSnapshotData = useBlogSnapshot.data?.data.data;

    const total = useBlogSnapshot.data?.data.total;

    useEffect(() => {
        useBlogSnapshot.run(pageInfo);
        // console.log(blogSnapshotData)
    }, [pageInfo.page]);

    // const IconText = (icon: any, text: string, key: string) => (
    //     <Space key={key}>
    //         {icon}
    //         {text}
    //     </Space>
    // );

    const renderDesc = (createtime: Date, category: categoryBase, taglist: tagBase[]) => (
        <div className={s.descshow} key={category.categoryId}>
            <div className={s.descshowitem}>
                <FieldTimeOutlined className={s.itemicon} />
                {dayjs(createtime).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            <Divider type='vertical' />
            <div className={s.descshowitem}>
                <FolderOutlined className={s.itemicon} />
                <Tag key={category.categoryId} color='blue'>
                    {category.categoryName}
                </Tag>
            </div>
            <Divider type='vertical' />
            <div className={s.descshowitem}>
                <TagsOutlined className={s.itemicon} />
                {taglist.map(item => (
                    <Tag color={item.tagColor} key={item.tagId} style={{ marginLeft: '2px' }}>
                        {item.tagName}
                    </Tag>
                ))}
            </div>
        </div>
    );

    const renderitemList = (item: ArticleSnapshot) => (
        // console.log(item)
        // <Card loading={loading} className={styles.itemcard}>

        <div className={s.listitem}>
            <List.Item
                key={item.blogId}
                actions={[
                    <Space key='start'>
                        <EyeOutlined />
                        {item.blogViews}
                    </Space>,
                    <Space key='likes'>
                        <LikeOutlined />
                        {item.blogLikes}
                    </Space>,

                    <Space key='message'>
                        <MessageOutlined />
                        {2}
                    </Space>

                    // <IconText icon={<EyeOutlined />} text={item.blogViews} key="start" />,
                ]}
                extra={
                    <img
                        width={260}
                        // height={150}
                        // styles={{ width: '250px', }}
                        style={{ paddingTop: '32px' }}
                        alt='logo'
                        src={item.blogCoverImage ? item.blogCoverImage : defaultImage}
                    />
                }
            >
                <List.Item.Meta
                    // avatar={<Avatar src={item.avatar} />}
                    title={
                        <span
                            className={s.itemtitle}
                            onClick={() => navigate(`/article/${item.blogId}`)}
                        >
                            {item.blogTitle}
                        </span>
                    }
                    description={renderDesc(item.blogCreateTime, item.categoryInfo, item.TagInfo)}
                />
                <p className={s.content}>
                    {item.blogSnapshotContent
                        .replace(/<a(.*?)>(.*?)<\/a>/g, '$2')
                        .replace(/[# |**|`|>]/g, '')}
                </p>
            </List.Item>
        </div>

        // </Card>
    );

    return (
        <section className={s.section}>
            <List
                itemLayout='vertical'
                loading={useBlogSnapshot.loading}
                size='large'
                dataSource={blogSnapshotData}
                renderItem={renderitemList}
                pagination={{
                    position: 'bottom',
                    size: 'default',
                    hideOnSinglePage: true,
                    current: pageInfo.page,
                    pageSize: pageInfo.pageSize,
                    total,

                    onChange(page, pageSize) {
                        setPage({ page, pageSize });
                    }
                }}
            />
        </section>
    );
};

export default index;
