import React from "react";
import { useRedashQueryData } from "../redash/redashData.js";
import RedashRenderer from "../redash/Renderer";
import { Spin } from 'antd';


// query, id.
// plot configuration
function RedashTable({ queryId }) {
        const queryResult = useRedashQueryData(queryId) //  (31,46) # queries/31/source#46
        console.log(queryResult)
        if (queryResult) {
                return (
                        <div className="redash_table">
                                <RedashRenderer type={"TABLE"} data={queryResult} />
                        </div>

                );
        }
        return <Spin size="large" />;
}

export default RedashTable;