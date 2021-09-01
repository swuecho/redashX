import { surveyjsQuestion2ProTable } from '../survey'
import {
    surveyjs2ProTable
} from '../survey'

// each page, each form
// TODO: only do first page.

let survey_json = {
    "pages": [{
        "name": "page1", "elements":
            [{
                "title": "状态", "choices":
                    [{ "value": "1", "text": "item 1", "meta": {} },
                    { "value": "2", "text": "item 2", "meta": {} },
                    { "value": "3", "text": "item 3", "meta": {} }], "name": "Q1", "type": "dropdown"
            }]
    }]
}

let input_json = survey_json['pages'][0]["elements"][0]

let expected_json = {
    "title": "状态",
    "dataIndex": "Q1",
    "valueType": "select",
    "fieldProps": {
        "options": [
            {
                "label": "item 1",
                "value": "1"
            },
            {
                "label": "item 2",
                "value": "2"
            },
            {
                "label": "item 3",
                "value": "3"
            }
        ]
    }
}

test('rand str', () => {
    expect(surveyjsQuestion2ProTable(input_json)).toEqual(expected_json)
})

test('surveyjs ', () => {
    expect(surveyjs2ProTable(survey_json)).toEqual([expected_json])
})
