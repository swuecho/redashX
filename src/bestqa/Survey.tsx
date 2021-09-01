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



const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

async function saveRecord(surveyName: string, data: DataSourceType) {
    let ridName = `${surveyName}-rid`
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }
    headers[ridName] = data['id'] as string;
    let result = await axios.post(`${hostname()}/sr/${surveyName}`, data, {
        headers,
        withCredentials: true
    })
    console.log(result)
}

type DataSourceType = {
    id: React.Key;
    //name?: string;
    [key: string]: string | React.Key;
    //children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
];

const defaultSystemDataLength = Object.keys({
    "id": "testdLUho4",
    "extra": null,
    "status": "F",
    "start_time": "2021-09-01T11:27:46.409562",
    "last_modified": "2021-09-01T11:27:46.409562",
    "Q_BESTQA_GET_IP": "192.168.0.147",
    "Q_BESTQA_GET_UA": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
    "Q_BESTQA_GET_CITY": "",
    "Q_BESTQA_GET_REFERER": "http://192.168.0.97:8080/survey/dashboard?id=bestqa_protable&editor=visual",
    "Q_BESTQA_GET_LOCATION": "{\"status\": \"1\", \"info\": \"OK\", \"infocode\": \"10000\", \"adcode\": \"000000\", \"rectangle\": \"\", \"country\": \"局域网\", \"city\": \"\", \"province\": \"局域网\"}",
    "Q_BESTQA_GET_PROVINCE": "局域网"
}).length

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
            let hostname_str = hostname()
            let surveyjsResp = await axios.get(`${hostname_str}/go/survey/${surveyName}`);
            let surveyjsJson = surveyjs2ProTable(JSON.parse(surveyjsResp.data))
            //let data: DataSourceType[];
            setColumnHeaders(surveyjsJson as unknown as ProColumns<DataSourceType>[])
        }
        fetchSurveyJson(sid)
    }, []);

    useEffect(() => {
        async function fetchAllRows(surveyName: string) {
            //let data: DataSourceType[];
            const { data, error } = await pgrest_survey_client
                .from(`v_${surveyName}_answer_json`)
            //@ts-ignore
            setDataSource(data?.map((x) => x.answer)?.filter(x => Object.keys(x).length > defaultSystemDataLength) as DataSourceType[]);
        }
        fetchAllRows(sid)
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