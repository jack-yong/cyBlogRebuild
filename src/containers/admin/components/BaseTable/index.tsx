import React from 'react';
import { Table } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { PageInfo } from '../../interfaces/type';
import s from './index.mod.scss';
interface BaseTableProps {
    // eslint-disable-next-line
    columns: ColumnType<any>[];
    // eslint-disable-next-line
    loading: boolean;
    total: number;
    rowKey: string;
    // eslint-disable-next-line
    setPage: Function;
    //eslint-disable-next-line
    dataSource: any;
    page: PageInfo;
}

const BaseTable: React.FC<BaseTableProps> = ({
    columns,
    loading,
    page,
    total,
    rowKey,
    setPage,
    dataSource
}) => {
    return (
        <Table
            // className={s.table}
            columns={columns}
            rowKey={rowKey}
            loading={loading}
            bordered
            dataSource={dataSource}
            pagination={{
                size: 'default',
                current: page.page,
                pageSize: page.pageSize,
                total,
                showTotal: total => <span>共{total}条</span>,
                showQuickJumper: true,
                onChange(page, pageSize) {
                    setPage({ page, pageSize });
                }
            }}
        />
    );
};

export default BaseTable;
