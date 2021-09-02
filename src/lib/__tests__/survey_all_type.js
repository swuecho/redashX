import { surveyjsQuestion2ProTable } from '../survey'


let surveyjs_json = {
    "pages": [{
        "name": "page1", "elements": [{
            "title": "请选择一个选项", "choices":
                [{ "value": "1", "text": "选项1", "meta": {} }, { "value": "2", "text": "选项2", "meta": {} }, { "value": "3", "text": "选项3", "meta": {} }, { "value": "4", "text": "选项4", "meta": {} }], "name": "Q1", "type": "radiogroup"
        },
        { "title": "问题描述", "choices": [{ "value": "1", "text": "选项1", "meta": {} }, { "value": "2", "text": "选项2", "meta": {} }, { "value": "3", "text": "选项3", "meta": {} }], "name": "Q2", "type": "checkbox" },
        { "title": "问题描述", "name": "Q3", "type": "text", "inputType": "text" },
        { "title": "问题描述", "name": "Q4", "type": "comment", "inputType": "text" },
        { "title": "问题描述", "rateMin": 1, "rateMax": 5, "minRateDescription": "", "maxRateDescription": "", "choices": [{ "value": 1, "text": "", "meta": {} }, { "value": 2, "text": "", "meta": {} }, { "value": 3, "text": "", "meta": {} }, { "value": 4, "text": "", "meta": {} }, { "value": 5, "text": "", "meta": {} }], "name": "Q5", "type": "rating" },
        { "title": "问题描述", "choices": [{ "value": "1", "text": "选项1", "meta": {} }, { "value": "2", "text": "选项2", "meta": {} }, { "value": "3", "text": "选项3", "meta": {} }], "name": "Q6", "type": "dropdown" },
        { "title": "是否同意", "choices": [{ "value": "0", "text": "false", "meta": {} }, { "value": "1", "text": "true", "meta": {} }], "name": "Q7", "type": "boolean" }]
    }]
}
let elements = surveyjs_json['pages'][0]['elements']


let expected_json_all = [{ "dataIndex": "Q1", "fieldProps": { "options": [{ "label": "选项1", "value": "1" }, { "label": "选项2", "value": "2" }, { "label": "选项3", "value": "3" }, { "label": "选项4", "value": "4" }] }, "title": "请选择一个选项", "valueType": "radio" },
{ "dataIndex": "Q2", "fieldProps": { "options": [{ "label": "选项1", "value": "1" }, { "label": "选项2", "value": "2" }, { "label": "选项3", "value": "3" }] }, "title": "问题描述", "valueType": "checkbox" },
{ "dataIndex": "Q3", "title": "问题描述", "valueType": "text" , "copyable": true},
{ "dataIndex": "Q4", "title": "问题描述", "valueType": "textarea",  "copyable": true },
{ "dataIndex": "Q5", "title": "问题描述", "valueType": "rate" },
{ "dataIndex": "Q6", "fieldProps": { "options": [{ "label": "选项1", "value": "1" }, { "label": "选项2", "value": "2" }, { "label": "选项3", "value": "3" }] }, "title": "问题描述", "valueType": "select" },
{ "dataIndex": "Q7", "title": "是否同意", "valueType": "switch" }]

test('all', () => {
    expect(surveyjsQuestion2ProTable(elements)).toEqual(expected_json_all)
})