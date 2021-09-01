//@ts-ignore @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
// @typescript-eslint/no-unused-vars
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import { pgrest_admin_client } from "../lib/pgrest";
import { waitTime } from "../lib/util"
import type { DataSourceType } from "../types"
import { deleteExcelRow, insertExcelRow, upsertExcelRow } from "../api/excel"

interface ExcelName {
    name: string;
    eid: number;
}

export default function MyProTable({ name, eid }: ExcelName) {
    // state is tracked. one change and all related will change
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
    const [headerNames, setHeaderNames] = useState<string[]>([]);

    useEffect(() => {
        async function fetchExcelRows(eid: number) {
            //let data: DataSourceType[];
            const { data, error } = await pgrest_admin_client
                .from('excel_row')
                .select('json')
                .eq('eid', eid);

            setDataSource(data?.map((x) => x.json) as DataSourceType[]);
            if (data && data.length > 0) {
                setHeaderNames(Object.keys(data[0].json))
            }
        }
        fetchExcelRows(eid)
    }, []);
    if (dataSource && dataSource.length > 0) {
        let normalColumns = headerNames.filter(x => x !=
            'id').map((x) => ({
                title: x,
                dataIndex: x
            }))
        const columns: ProColumns<DataSourceType>[] = [
            ...normalColumns,
            {
                title: '操作',
                valueType: 'option',
                width: 200,
                render: (text, record, _, action) => [
                    <a
                        key="editable"
                        onClick={() => {
                            action?.startEditable?.(record.id);
                        }}
                    >
                        编辑
                    </a>,
                    <a
                        key="delete"
                        onClick={() => {
                            // TODO: delete record.id from db
                            deleteExcelRow(eid, record.id);
                            // refetch data
                            setDataSource(dataSource.filter((item) => item.id !== record.id));
                        }}
                    >
                        删除
                    </a>,
                ],
            },
        ];

        return (
            <>
                <EditableProTable<DataSourceType>
                    rowKey="id"
                    headerTitle={name}
                    recordCreatorProps={
                        {
                            position: 'top',
                            // create record and get the id
                            record: () => {
                                return { id: dataSource.length + 1 }
                            }
                        }
                    }
                    columns={columns}
                    value={dataSource}
                    onChange={setDataSource}
                    editable={{
                        type: 'multiple',
                        editableKeys,
                        onSave: async (rowKey, data, row) => {
                            // send data
                            console.log(rowKey, data, row);
                            // new record , insert
                            if (data.id > dataSource.length) {
                                await insertExcelRow(eid, data, headerNames)
                            } else {
                                // udpate
                                await upsertExcelRow(eid, data, headerNames)
                            }
                            // TODO: save data into database
                            await waitTime(1000);
                        },
                        onChange: setEditableRowKeys,
                    }}
                />
            </>
        );
    }
    return null;
};