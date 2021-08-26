import { useRedashQueryData } from "./redashData";
import ReactJson from 'react-json-view'
import { useEffect, useState } from "react";


export function getValueInFirstRow(data, name) {
        if (data) { return data['rows'][0][name] }
}

export function RedashValue() {
        // render after useEffect function run?
        const proData = useRedashQueryData(65);
        // how to extact. 
        // average follow proData
        const [average, setAverage] = useState(0);

        useEffect(() => {
                setAverage(getValueInFirstRow(proData, 'average'))
        }, [proData]);

        return (
                <div>
                        <p>
                                中位数 { getValueInFirstRow(proData, 'median')} 平均值 {average}
                        </p>
                </div>
        )
}

export default RedashValue;