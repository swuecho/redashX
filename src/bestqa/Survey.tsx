import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { surveyjs2ProTable } from "../lib/survey";
import axios from "axios";
import { hostname } from '../lib/config';
import { genRecordID } from "../lib/survey";
import { pgrest_survey_client } from "../lib/pgrest";
import { deleteRecord, saveRecord } from '../api/survey';
import { waitTime } from "../lib/util"
import type { DataSourceType } from "../types"


const defaultData: DataSourceType[] = [
];

export default function Survey() {
    //@ts-ignore
    let { sid } = useParams();
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    const [dataSourceInit, setDataSourceInit] = useState<DataSourceType[]>([]);
    const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
    const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');
    const [columnHeaders, setColumnHeaders] = useState<ProColumns<DataSourceType>[]>([]);

    useEffect(() => {
        async function fetchSurveyJson(surveyName: string) {
            // TODO: api to get surveyjs json
            let hostname_str = hostname()
            let surveyjsResp = await axios.get(`${hostname_str}/go/survey/${surveyName}`);
            let surveyjsJson = surveyjs2ProTable(surveyjsResp.data)
            //let data: DataSourceType[];
            //@ts-ignore
            for (let columnDef of surveyjsJson) {
                console.log(columnDef)
                if (columnDef['filters']) {
                    columnDef['onFilter'] = true
                }
                if (columnDef['sorter']) {
                    let columndataIndex = columnDef['dataIndex']
                    if (columnDef['valueType'] == 'switch') {
                        //@ts-ignore
                        columnDef['sorter'] = (a, b) => a[columndataIndex] > b[columndataIndex]
                    } else {

                        //@ts-ignore better '10'.localeCompare('2', undefined, {numeric: true, sensitivity: 'base'})
                        let sorterFn = (a, b) => {
                            console.log(a, b)
                            return a[columndataIndex].localeCompare(b[columndataIndex], undefined, { numeric: true, sensitivity: 'base' })
                        }
                        columnDef['sorter'] = sorterFn
                    }
                }

            }
            //@ts-ignore
            // surveyjsJson[0] = firstCol
            setColumnHeaders(surveyjsJson as unknown as ProColumns<DataSourceType>[])
        }
        fetchSurveyJson(sid)
    }, [sid]);


    //
    useEffect(() => {
        async function fetchAllRows(surveyName: string) {
            //let data: DataSourceType[];
            const { data, error } = await pgrest_survey_client
                .from(`v_${surveyName}_answer_json`)
            //@ts-ignore
            setDataSourceInit(data?.map((x) => ({ id: x.rid, ...x.json })) as DataSourceType[]);
        }
        fetchAllRows(sid)
    }, [sid]);

    // let setDataSource Run on each state change
    useEffect(() => {
        if (dataSourceInit) {
            setDataSource(dataSourceInit)
        }
    })

    const columns: ProColumns<DataSourceType>[] = [
        ...columnHeaders,
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
                    onClick={async () => {
                        await deleteRecord(sid, record.id);
                        setDataSourceInit(dataSource.filter((item) => item.id !== record.id));
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
                headerTitle={sid}
                recordCreatorProps={
                    position !== 'hidden'
                        ? {
                            position: position as 'top',
                            record: () => ({ id: genRecordID() }),
                        }
                        : false
                }
                toolBarRender={() => [
                    <ProFormRadio.Group
                        key="render"
                        fieldProps={{
                            value: position,
                            onChange: (e) => setPosition(e.target.value),
                        }}
                        options={[
                            {
                                label: '添加到顶部',
                                value: 'top',
                            },
                            {
                                label: '添加到底部',
                                value: 'bottom',
                            },
                            {
                                label: '隐藏',
                                value: 'hidden',
                            },
                        ]}
                    />,
                ]}
                columns={columns}
                request={async () => ({
                    data: defaultData,
                    total: 3,
                    success: true,
                })}
                value={dataSource}
                onChange={setDataSource}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    onSave: async (rowKey, data, row) => {

                        // send data
                        console.log(rowKey, data, row);
                        // new record , insert
                        // udpate
                        await saveRecord(sid, data);
                        await waitTime(1000);
                    },
                    onChange: setEditableRowKeys,
                }}
            />
            <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
                <ProFormField
                    ignoreFormItem
                    fieldProps={{
                        style: {
                            width: '100%',
                        },
                    }}
                    mode="read"
                    valueType="jsonCode"
                    text={JSON.stringify(dataSource)}
                />
            </ProCard>
        </>
    );
};