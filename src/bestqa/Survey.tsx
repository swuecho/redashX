import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { surveyjs2ProTable } from "../lib/survey";
import axios from "axios";
import { hostname } from '../lib/config';



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

const defaultData: DataSourceType[] = [
];

export default function Survey() {
    //@ts-ignore
    let { sid } = useParams();
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
    const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');
    const [columnHeaders, setColumnHeaders] = useState<ProColumns<DataSourceType>[]>([]);

    useEffect(() => {
        async function fetchSurveyJson(surveyName: string) {
            // TODO: api to get surveyjs json
            console.log(hostname())
            let hostname_str = hostname()
            console.log(hostname_str)
            let surveyjsResp = await axios.get(`${hostname_str}/go/survey/${surveyName}`);
            console.log(surveyjsResp)
            let surveyjsJson = surveyjs2ProTable(JSON.parse(surveyjsResp.data))
            //let data: DataSourceType[];
            setColumnHeaders(surveyjsJson as unknown as ProColumns<DataSourceType>[])
            console.log(columnHeaders)
        }
        fetchSurveyJson(sid)
    }, []);


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
                    onClick={() => {
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
                headerTitle={sid}
                maxLength={5}
                recordCreatorProps={
                    position !== 'hidden'
                        ? {
                            position: position as 'top',
                            record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
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
                        await waitTime(2000);
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