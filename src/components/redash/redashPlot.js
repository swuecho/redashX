import React from "react";
import { useRedashQueryData, useRedashPlot } from "../redash/redashData.js";
import RedashRenderer from "../redash/Renderer";
import { Spin } from 'antd';


// query, id.
// plot configuration
function RedashPlot({ queryId, plotId }) {
  const queryResult = useRedashQueryData(queryId) //  (31,46) # queries/31/source#46
  const visConfig = useRedashPlot(queryId, plotId) // { "id": 46, "type": "CHART", "name": "Chart", "description": "", "options": { "globalSeriesType": "line", "sortX": true, "legend": { "enabled": true, "placement": "auto", "traceorder": "normal" }, "xAxis": { "type": "datetime", "labels": { "enabled": true }, "title": { "text": "\u65e5\u671f" } }, "yAxis": [{ "type": "linear", "title": { "text": "\u53ef\u8f6c\u503a\u6570\u91cf" } }, { "type": "linear", "opposite": true }], "alignYAxesAtZero": false, "error_y": { "type": "data", "visible": true }, "series": { "stacking": null, "error_y": { "type": "data", "visible": true } }, "seriesOptions": { "total": { "zIndex": 1, "index": 0, "type": "line", "name": "\u603b\u6570\u91cf", "yAxis": 0 }, "less_100": { "zIndex": 0, "index": 0, "type": "line", "name": "\u4ef7\u683c<100 \u6570\u91cf", "yAxis": 0 } }, "valuesOptions": {}, "columnMapping": { "total": "y", "less_100": "y", "trade_date": "x" }, "direction": { "type": "counterclockwise" }, "sizemode": "diameter", "coefficient": 1, "numberFormat": "0,0[.]00000", "percentFormat": "0[.]00%", "textFormat": "", "missingValuesAsZero": true, "showDataLabels": false, "dateTimeFormat": "DD/MM/YY HH:mm", "customCode": "// Available variables are x, ys, element, and Plotly\n// Type console.log(x, ys); for more info about x and ys\n// To plot your graph call Plotly.plot(element, ...)\n// Plotly examples and docs: https://plot.ly/javascript/" }, "updated_at": "2021-01-26T13:47:20.136Z", "created_at": "2021-01-26T13:35:22.645Z" }
  if (queryResult && visConfig) {
    return (
      <div className="redash_plot">
        <RedashRenderer type={visConfig.type} visualizationName={visConfig.name} options={visConfig.options} data={queryResult} />
      </div>

    );
  }
  return <Spin size="large"/>;
}

export default RedashPlot;