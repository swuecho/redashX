// @ts-ignore
import { transform } from "node-json-transform";

const type_mapper: Record<string, string> = {
    radiogroup: "radio",
    checkbox: "checkbox",
    dropdown: "select",
    text: "text",
    rating: "rate",
    boolean: "switch",
    comment: "textarea"
}

export function surveyjsQuestion2ProTable(surveyjsQuestion: JSON): JSON {

    let result = transform(surveyjsQuestion, {
        item: {
            title: "title",
            dataIndex: "name",
            fieldProps: { options: "choices" },
            valueType: "type"
        },
        operate: [
            {
                run: function (val: string) { return type_mapper[val] }, on: "valueType"
            },
            {
                run: function (opts: any[]) { return opts ? opts.map((opt: { text: any; value: any; }) => ({ label: opt.text, value: opt.value })) : undefined }, on: "fieldProps.options"
            }
        ],
        // Not required.  Runs after object mapping and operations.  Allows access to each item for manipulation.
        each: function (item: any) {
            let textType = new Set(["text", "textarea", "rate", "switch"])
            if (textType.has(item['valueType'])) {
                delete item['fieldProps']
            }
            return item;
        }
    }
    )
    return result
}


export function surveyjs2ProTable(surveyjs: JSON): JSON {
    //@ts-ignore
    return surveyjsQuestion2ProTable(surveyjs['pages'][0]['elements'])

}
