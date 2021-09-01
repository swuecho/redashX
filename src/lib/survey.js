import { transform } from "node-json-transform";


const type_mapper = {
    radiogroup: "radio",
    checkbox: "checkbox",
    dropdown: "select",
    text: "text",
    rating: "rate",
    boolean: "switch",
    comment: "textarea"
}

export function surveyjsQuestion2ProTable(surveyjsQuestion) {

    let result = transform(surveyjsQuestion, {
        item: {
            title: "title",
            dataIndex: "name",
            fieldProps: { options: "choices" },
            valueType: "type"
        },
        operate: [
            {
                run: function (val) { return type_mapper[val] }, on: "valueType"
            },
            {
                run: function (opts) { return opts ? opts.map(opt => ({ label: opt.text, value: opt.value })) : undefined }, on: "fieldProps.options"
            }
        ],
        // Not required.  Runs after object mapping and operations.  Allows access to each item for manipulation.
        each: function (item) {  
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