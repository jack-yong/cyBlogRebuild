import React, { useEffect, useState } from 'react';
import s from './index.mod.scss';
import './index.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchCategoryList } from '../../apis/category';
import { useRequest, useSetState } from 'ahooks';
import { PageInfo } from '@/interface/common';
import { fetchBlogSnapshot } from '../../apis/home';
import { Spin, Tag, Badge, Pagination } from 'antd';
import ArticleSnapList from '../../components/ArticleSnapList';
import { ArticleSnapshot } from '../../interfaces/home';
const PAGE_SIZE = 6;
const Category = () => {
    const location = useLocation();
    // const [blogCategoryId, setCategoryId] = useState<string>();
    const navigate = useNavigate();
    const [pageInfo, setPage] = useSetState<PageInfo>({
        page: 1,
        pageSize: PAGE_SIZE
    });
    const queryStr = location.pathname.split('/').pop();
    const blogCategoryId = queryStr !== 'category' ? queryStr : undefined;
    const useBlogSnapshot = useRequest(fetchBlogSnapshot, { manual: true });
    const useCategoryList = useRequest(fetchCategoryList, { manual: true });

    const categoryList = useCategoryList.data?.data;
    const total = useBlogSnapshot.data?.data.total;

    useEffect(() => {
        useCategoryList.run();
    }, []);

    useEffect(() => {
        useBlogSnapshot.run({ blogCategoryId, ...pageInfo });
    }, [blogCategoryId, pageInfo]);
    return (
        <div className={s.categorypage}>
            <div className={s.categoryshow}>
                <Spin spinning={useCategoryList.loading}>
                    <div className={s.categorylist} id='categoryList'>
                        <Tag
                            color={'blue'}
                            key={'all'}
                            onClick={() => {
                                navigate(`/article/category`);
                            }}
                        >
                            {'全部'}
                        </Tag>
                        {categoryList &&
                            categoryList.map(item => (
                                <Badge count={item.value} size='small' key={item.id}>
                                    <Tag
                                        color={'blue'}
                                        key={item.id}
                                        onClick={() => {
                                            navigate(`/article/category/${item.id}`);
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

export default Category;
