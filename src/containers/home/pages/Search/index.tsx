import React, { useEffect, useState } from 'react';
import { fetchBlogSnapshot } from '../../apis/home';
import s from './index.mod.scss';
import { useRequest, useSetState } from 'ahooks';
import ArticleSnapList from '../../components/ArticleSnapList';
import { Input, Pagination } from 'antd';
import { PageInfo } from '@/interface/common';
import { ArticleSnapshot } from '../../interfaces/home';
const { Search } = Input;

const PAGE_SIZE = 6;

const index: React.FC = () => {
    const [searchKey, setSearchKey] = useState<string>('');

    const [pageInfo, setPage] = useSetState<PageInfo>({
        page: 1,
        pageSize: PAGE_SIZE
    });

    const useBlogSnapshot = useRequest(fetchBlogSnapshot, { manual: true });
    const total = useBlogSnapshot.data?.data.total;

    useEffect(() => {
        useBlogSnapshot.run({ blogTitle: searchKey, ...pageInfo });
    }, [searchKey, pageInfo]);

    return (
        <div className={s.searchPage}>
            <div className={s.searchShow}>
                <Search
                    placeholder='请输入关键字进行搜索'
                    className={s.searchinput}
                    enterButton
                    onSearch={value => setSearchKey(value)}
                />
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
