import { surveyjsQuestion2ProTable } from '../survey'

// each page, each form
// TODO: only do first page.

let survey_json = {
    "pages": [{
        "name": "page1", "elements":
            [
                { "title": "状态", "choices": [{ "value": "1", "text": "item 1", "meta": {} }, { "value": "2", "text": "item 2", "meta": {} }, { "value": "3", "text": "item 3", "meta": {} }], "name": "Q1", "type": "radiogroup" },
                { "title": "问题描述", "choices": [{ "value": "1", "text": "选项1", "meta": {} }, { "value": "2", "text": "选项2", "meta": {} }, { "value": "3", "text": "选项3", "meta": {} }], "name": "Q2", "type": "dropdown" },
                { "title": "问题描述", "choices": [{ "value": "1", "text": "选项1", "meta": {} }, { "value": "2", "text": "选项2", "meta": {} }, { "value": "3", "text": "选项3", "meta": {} }], "name": "Q3", "type": "checkbox" },
                { "title": "问题描述", "name": "Q4", "type": "text", "inputType": "text" },
                { "title": "问题描述", "name": "Q5", "type": "comment", "inputType": "text" }
            ]
    }]
}


let elements = survey_json['pages'][0]["elements"]

let expected_json = {
    "title": "问题描述",
    "dataIndex": "Q4",
    "key": "Q4",
    "valueType": "text",
    "copyable": true
}

test('text', () => {
    expect(surveyjsQuestion2ProTable(elements[3])).toEqual(expected_json)
})

let expected_json_all = [
    {
        "dataIndex": "Q1",
        "key": "Q1",
        "fieldProps": {
            "options": [{ "label": "item 1", "value": "1" }, { "label": "item 2", "value": "2" }, { "label": "item 3", "value": "3" }]
        },
        "title": "状态",
        "valueType": "radio",
        "filters": [
            {
                "text": "item 1",
                "value": "1",
            },
            {
                "text": "item 2",
                "value": "2",
            },
            {
                "text": "item 3",
                "value": "3",
            },
        ],
        "sorter": true,

    },
    {
        "dataIndex": "Q2",
        "key": "Q2",
        "fieldProps": {
            "options": [
                { "label": "选项1", "value": "1" },
                { "label": "选项2", "value": "2" },
                { "label": "选项3", "value": "3" }
            ]
        },
        "title": "问题描述",
        "valueType": "select",
        "filters": [
            {
                "text": "选项1",
                "value": "1",
            },
            {
                "text": "选项2",
                "value": "2",
            },
            {
                "text": "选项3",
                "value": "3",
            },
        ],
        "sorter": true
    },
    {
        "dataIndex": "Q3",
        "key": "Q3",
        "fieldProps": {
            "options": [
                { "label": "选项1", "value": "1" },
                { "label": "选项2", "value": "2" },
                { "label": "选项3", "value": "3" }
            ]
        },
        "title": "问题描述",
        "valueType": "checkbox",
        "filters": [
            {
                "text": "选项1",
                "value": "1",
            },
            {
                "text": "选项2",
                "value": "2",
            },
            {
                "text": "选项3",
                "value": "3",
            },
        ],
    },
    { "dataIndex": "Q4", "key": "Q4", "title": "问题描述", "valueType": "text", "copyable": true },
    { "dataIndex": "Q5", "key": "Q5", "title": "问题描述", "valueType": "textarea", "copyable": true }
]

test('all', () => {
    expect(surveyjsQuestion2ProTable(elements)).toEqual(expected_json_all)
})





