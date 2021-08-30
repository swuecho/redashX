import React, { useState, useEffect } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
// @typescript-eslint/no-unused-vars
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { pgrest_admin_client } from "../lib/pgrest";
import ReactJson from 'react-json-view';
// let uri = `excel_row?select=json&eid=eq.${props.eid}`;
// pgclient
// const { data, error } = await supabase
//  .from('excel_row')
//  .select('json')
//  .eq('eid', 1)

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

type DataSourceType = {
    id: React.Key;
    //name?: string;
    [key: string]: string | React.Key;
    //children?: DataSourceType[];
};


export default function MyProTable() {
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
    const eid: number = 1;

    useEffect(() => {
        async function fetchExcelRows(eid: number) {
            //let data: DataSourceType[];
            const { data, error } = await pgrest_admin_client
                .from('excel_row')
                .select('json')
                .eq('eid', eid);

            setDataSource(data?.map((x) => x.json) as DataSourceType[]);
        }
        fetchExcelRows(eid)
    }, []);
    if (dataSource && dataSource.length > 0) {
        console.log(dataSource)
        let headers = Object.keys(dataSource[0])
        let normalColumns = headers.map((x) => ({
            title: x,
            dataIndex: x
        }))

        console.log(normalColumns)


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
                    headerTitle="可编辑表格"
                    recordCreatorProps={
                        {
                            position: 'top',
                            // create record and get the id
                            record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
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
                            // TODO: save data into database
                            await waitTime(1000);
                        },
                        onChange: setEditableRowKeys,
                    }}
                />
                <ProCard title="表格数据" collapsible defaultCollapsed>
                    <ReactJson src={dataSource} />
                </ProCard>
            </>
        );
    }
    return null;
};