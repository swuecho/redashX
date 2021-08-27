import React from "react";
import { useRedashQueryData } from "../redash/redashData";
import ReactJson from 'react-json-view'

// query, id.
// plot configuration

function RedashTable() {
        const proData = useRedashQueryData(65);
        return (
                <div>
                        <ReactJson src={proData}></ReactJson>
                </div>

        );
}

export default RedashTable;