import React, { useEffect } from 'react';
import s from './index.mod.scss';
import './index.scss';
import { useRequest, useSetState } from 'ahooks';
import { PageInfo } from '@/interface/common';
import { fetchBlogSnapshot } from '../../apis/home';
import { useLocation, useNavigate } from 'react-router-dom';
import { Badge, Pagination, Spin, Tag } from 'antd';
import { fetchTagList } from '../../apis/tag';
import ArticleSnapList from '../../components/ArticleSnapList';
import { ArticleSnapshot } from '../../interfaces/home';
import { tagWithArticleNum } from '../../interfaces/tag';

const PAGE_SIZE = 6;

const index: React.FC = () => {
    // const [tagId, setTagId] = useState<string>();
    const navigate = useNavigate();
    const [pageInfo, setPage] = useSetState<PageInfo>({
        page: 1,
        pageSize: PAGE_SIZE
    });
    const location = useLocation();
    const useBlogSnapshot = useRequest(fetchBlogSnapshot, { manual: true });
    const useTagList = useRequest(fetchTagList, { manual: true });
    const queryStr = location.pathname.split('/').pop();
    const blogTags = queryStr !== 'tag' ? queryStr : undefined;
    const tagList = useTagList.data?.data;
    const total = useBlogSnapshot.data?.data.total;

    useEffect(() => {
        useTagList.run();
    }, []);

    useEffect(() => {
        useBlogSnapshot.run({ blogTags, ...pageInfo });
    }, [blogTags, pageInfo]);
    return (
        <div className={s.tagpage}>
            <div className={s.tagshow}>
                <Spin spinning={useTagList.loading}>
                    <div className={s.taglist} id='tagsList'>
                        <Tag
                            color={'blue'}
                            key={'all'}
                            onClick={() => {
                                navigate(`/article/tag`);
                            }}
                        >
                            {'全部'}
                        </Tag>
                        {tagList &&
                            tagList.map((item: tagWithArticleNum) => (
                                <Badge count={item.value} size='small' key={item.id}>
                                    <Tag
                                        color={item.tagColor}
                                        key={item.id}
                                        onClick={() => {
                                            navigate(`/article/tag/${item.id}`);
                                        }}
                                    >
                                        {item.name}
                                    </Tag>
                                </Badge>
                            ))}
                    </div>
                </Spin>
            </div>
            <ArticleSnapList
                articleData={useBlogSnapshot.data?.data.data as ArticleSnapshot[]}
                loading={useBlogSnapshot.loading}
            />
            <Pagination
                className={s.pagination}
                current={pageInfo.page}
                total={total}
                pageSize={pageInfo.pageSize}
                showSizeChanger={false}
                showTitle={false}
                onChange={(page, pageSize) => setPage({ page, pageSize })}
                hideOnSinglePage={true}
            />
        </div>
    );
};

export default index;
