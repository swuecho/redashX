import {
    surveyjs2ProTable
} from '../survey'

const surveyjs = {
    "pages": [
        {
            "name": "1",
            "elements": [
                {
                    "name": "Q1", "defaultValue": "1", "type": "radiogroup", "title": "请选择一个选项",
                    "choices": [{ "meta": {}, "text": "选项1", "value": "1" }, { "meta": {}, "text": "选项2", "value": "2" }, { "meta": {}, "text": "选项3", "value": "3" }, { "meta": {}, "text": "选项4", "value": "4" }],
                    "hasOther": true
                },
                { "name": "Q2", "type": "checkbox", "title": "多选问题示范", "choices": [{ "meta": {}, "text": "A", "value": "1" }, { "meta": {}, "text": "B", "value": "2" }, { "meta": {}, "text": "C", "value": "3" }, { "meta": {}, "text": "D", "value": "4" }, { "meta": {}, "text": "E", "value": "5" }] },
                { "name": "Q3", "type": "text", "title": "简答问题示范", "inputType": "text" }, { "name": "Q4", "type": "comment", "title": "问答问题示范", "inputType": "text" }, { "name": "Q5", "type": "dropdown", "title": "下拉框示范", "choices": [{ "meta": {}, "text": "A", "value": "1" }, { "meta": {}, "text": "B", "value": "2" }, { "meta": {}, "text": "C", "value": "3" }, { "meta": {}, "text": "D", "value": "4" }, { "meta": {}, "text": "E", "value": "5" }] }, { "name": "Q6", "type": "boolean", "title": "现在是白天么", "choices": [{ "meta": {}, "text": "false", "value": "0" }, { "meta": {}, "text": "true", "value": "1" }] }, { "name": "Q7", "type": "rating", "title": "请评价我们的服务", "choices": [{ "meta": {}, "text": "", "value": 1 }, { "meta": {}, "text": "", "value": 2 }, { "meta": {}, "text": "", "value": 3 }, { "meta": {}, "text": "", "value": 4 }, { "meta": {}, "text": "", "value": 5 }], "rateMax": 5, "rateMin": 1, "maxRateDescription": "", "minRateDescription": "" }]
        }
    ]
}


const expected_json_all = [
    {
        "title": "请选择一个选项",
        "dataIndex": "Q1",
        "valueType": "radio",
        "initialValue": "1",
        "fieldProps": {
            "options": [
                {
                    "label": "选项1",
                    "value": "1"
                },
                {
                    "label": "选项2",
                    "value": "2"
                },
                {
                    "label": "选项3",
                    "value": "3"
                },
                {
                    "label": "选项4",
                    "value": "4"
                }
            ]
        },
        "filters": [
            {
                "meta": {},
                "text": "选项1",
                "value": "1"
            },
            {
                "meta": {},
                "text": "选项2",
                "value": "2"
            },
            {
                "meta": {},
                "text": "选项3",
                "value": "3"
            },
            {
                "meta": {},
                "text": "选项4",
                "value": "4"
            }
        ],
        "sorter": true
    },
    {
        "title": "多选问题示范",
        "dataIndex": "Q2",
        "valueType": "checkbox",
        "fieldProps": {
            "options": [
                {
                    "label": "A",
                    "value": "1"
                },
                {
                    "label": "B",
                    "value": "2"
                },
                {
                    "label": "C",
                    "value": "3"
                },
                {
                    "label": "D",
                    "value": "4"
                },
                {
                    "label": "E",
                    "value": "5"
                }
            ]
        },
        "filters": [
            {
                "meta": {},
                "text": "A",
                "value": "1"
            },
            {
                "meta": {},
                "text": "B",
                "value": "2"
            },
            {
                "meta": {},
                "text": "C",
                "value": "3"
            },
            {
                "meta": {},
                "text": "D",
                "value": "4"
            },
            {
                "meta": {},
                "text": "E",
                "value": "5"
            }
        ],
        "sorter": true
    },
    {
        "title": "简答问题示范",
        "dataIndex": "Q3",
        "valueType": "text",
        "copyable": true
    },
    {
        "title": "问答问题示范",
        "dataIndex": "Q4",
        "valueType": "textarea",
        "copyable": true
    },
    {
        "title": "下拉框示范",
        "dataIndex": "Q5",
        "valueType": "select",
        "fieldProps": {
            "options": [
                {
                    "label": "A",
                    "value": "1"
                },
                {
                    "label": "B",
                    "value": "2"
                },
                {
                    "label": "C",
                    "value": "3"
                },
                {
                    "label": "D",
                    "value": "4"
                },
                {
                    "label": "E",
                    "value": "5"
                }
            ]
        },
        "filters": [
            {
                "meta": {},
                "text": "A",
                "value": "1"
            },
            {
                "meta": {},
                "text": "B",
                "value": "2"
            },
            {
                "meta": {},
                "text": "C",
                "value": "3"
            },
            {
                "meta": {},
                "text": "D",
                "value": "4"
            },
            {
                "meta": {},
                "text": "E",
                "value": "5"
            }
        ],
        "sorter": true
    },
    {
        "title": "现在是白天么",
        "dataIndex": "Q6",
        "valueType": "switch",
        "fieldProps": {
            "options": [
                {
                    "label": "false",
                    "value": "0"
                },
                {
                    "label": "true",
                    "value": "1"
                }
            ]
        },
        "filters": [
            {
                "meta": {},
                "text": "false",
                "value": "0"
            },
            {
                "meta": {},
                "text": "true",
                "value": "1"
            }
        ],
        "sorter": true
    },
    {
        "title": "请评价我们的服务",
        "dataIndex": "Q7",
        "valueType": "rate",
        "filters": [
            {
                "text": "1星",
                "value": 1
            },
            {
                "text": "2星",
                "value": 2
            },
            {
                "text": "3星",
                "value": 3
            },
            {
                "text": "4星",
                "value": 4
            },
            {
                "text": "5星",
                "value": 5
            }
        ]
    }
]

test('all', () => {

    expect(surveyjs2ProTable(surveyjs)).toEqual(expected_json_all)
})