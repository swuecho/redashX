import {
    surveyjs2ProTable
} from '../survey'

const surveyjs = { "pages": [{ "name": "1", "elements": [{ "name": "Q1", "type": "radiogroup", "title": "请选择一个选项", "choices": [{ "meta": {}, "text": "选项1", "value": "1" }, { "meta": {}, "text": "选项2", "value": "2" }, { "meta": {}, "text": "选项3", "value": "3" }, { "meta": {}, "text": "选项4", "value": "4" }], "hasOther": true }, { "name": "Q2", "type": "checkbox", "title": "多选问题示范", "choices": [{ "meta": {}, "text": "A", "value": "1" }, { "meta": {}, "text": "B", "value": "2" }, { "meta": {}, "text": "C", "value": "3" }, { "meta": {}, "text": "D", "value": "4" }, { "meta": {}, "text": "E", "value": "5" }] }, { "name": "Q3", "type": "text", "title": "简答问题示范", "inputType": "text" }, { "name": "Q4", "type": "comment", "title": "问答问题示范", "inputType": "text" }, { "name": "Q5", "type": "dropdown", "title": "下拉框示范", "choices": [{ "meta": {}, "text": "A", "value": "1" }, { "meta": {}, "text": "B", "value": "2" }, { "meta": {}, "text": "C", "value": "3" }, { "meta": {}, "text": "D", "value": "4" }, { "meta": {}, "text": "E", "value": "5" }] }, { "name": "Q6", "type": "boolean", "title": "现在是白天么", "choices": [{ "meta": {}, "text": "false", "value": "0" }, { "meta": {}, "text": "true", "value": "1" }] }, { "name": "Q7", "type": "rating", "title": "请评价我们的服务", "choices": [{ "meta": {}, "text": "", "value": 1 }, { "meta": {}, "text": "", "value": 2 }, { "meta": {}, "text": "", "value": 3 }, { "meta": {}, "text": "", "value": 4 }, { "meta": {}, "text": "", "value": 5 }], "rateMax": 5, "rateMin": 1, "maxRateDescription": "", "minRateDescription": "" }] }] }


const expected_json_all =
    [
        {
            "dataIndex": "Q1", "fieldProps":
                { "options": [{ "label": "选项1", "value": "1" }, { "label": "选项2", "value": "2" }, { "label": "选项3", "value": "3" }, { "label": "选项4", "value": "4" }] }, "title": "请选择一个选项", "valueType": "radio"
        },
        { "dataIndex": "Q2", "fieldProps": { "options": [{ "label": "A", "value": "1" }, { "label": "B", "value": "2" }, { "label": "C", "value": "3" }, { "label": "D", "value": "4" }, { "label": "E", "value": "5" }] }, "title": "多选问题示范", "valueType": "checkbox" },
        { "dataIndex": "Q3", "title": "简答问题示范", "valueType": "text", "copyable": true },
        { "copyable": true, "dataIndex": "Q4", "title": "问答问题示范", "valueType": "textarea" },
        { "dataIndex": "Q5", "fieldProps": { "options": [{ "label": "A", "value": "1" }, { "label": "B", "value": "2" }, { "label": "C", "value": "3" }, { "label": "D", "value": "4" }, { "label": "E", "value": "5" }] }, "title": "下拉框示范", "valueType": "select" },
        { "dataIndex": "Q6", "title": "现在是白天么", "valueType": "switch" },
        { "dataIndex": "Q7", "title": "请评价我们的服务", "valueType": "rate" }
    ]

test('all', () => {

    expect(surveyjs2ProTable(surveyjs)).toEqual(expected_json_all)
})