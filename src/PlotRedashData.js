import React, { useState } from "react";
import { Renderer, Editor } from "@redash/viz";

//import  cb_less   from "src/cb_less_100_ratio_2021_08_22.json"
// console.log(cb_less.query_result.data.rows)

const exampleData = {
        columns: [
                { type: null, name: "Country" },
                { type: null, name: "Amount" },
        ],
        rows: [
                { Amount: 37.620000000000005, Country: "Argentina" },
                { Amount: 37.620000000000005, Country: "Australia" },
                { Amount: 42.62, Country: "Austria" },
                { Amount: 37.62, Country: "Belgium" },
                { Amount: 190.09999999999997, Country: "Brazil" },
                { Amount: 303.9599999999999, Country: "Canada" },
                { Amount: 46.62, Country: "Chile" },
                { Amount: 90.24000000000001, Country: "Czech Republic" },
                { Amount: 37.620000000000005, Country: "Denmark" },
                { Amount: 41.620000000000005, Country: "Finland" },
                { Amount: 195.09999999999994, Country: "France" },
        ],
};

function RedashExample() {
        const [options, setOptions] = useState({ countRows: true });

        return (
                <div>
    <Editor
            type="COUNTER"
            visualizationName="Example Visualization"
            options={options}
            data={exampleData}
            onChange={setOptions}
    />
                        <Renderer type="COUNTER" visualizationName="Example Visualization" options={options} data={exampleData} />
                </div>
        );
}

export default RedashExample;