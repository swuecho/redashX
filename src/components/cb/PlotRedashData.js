import React from "react";
import { useRedashQueryData } from "../redash/redashData";
import  RedashRenderer  from "../redash/Renderer";

// query, id.
// plot configuration

function RedashExample() {
  const proData = useRedashQueryData(53);
  let pro_data = { "id": 53, "type": "CHART", "name": "cb_median_and_average", "description": "", "options": { hidePlotlyModeBar: true, "globalSeriesType": "column", "sortX": true, "legend": { "enabled": true, "placement": "auto", "traceorder": "normal" }, "xAxis": { "type": "datetime", "labels": { "enabled": true } }, "yAxis": [{ "type": "linear" }, { "type": "linear", "opposite": true }], "alignYAxesAtZero": false, "error_y": { "type": "data", "visible": true }, "series": { "stacking": null, "error_y": { "type": "data", "visible": true } }, "seriesOptions": { "average": { "zIndex": 1, "index": 0, "type": "line", "name": "\u5e73\u5747\u6570", "yAxis": 0 }, "median": { "zIndex": 0, "index": 0, "type": "line", "name": "\u4e2d\u4f4d\u6570", "yAxis": 0 } }, "valuesOptions": {}, "columnMapping": { "average": "y", "median": "y", "trade_date": "x" }, "direction": { "type": "counterclockwise" }, "sizemode": "diameter", "coefficient": 1, "numberFormat": "0,0[.]00000", "percentFormat": "0[.]00%", "textFormat": "", "missingValuesAsZero": true, "showDataLabels": false, "dateTimeFormat": "DD/MM/YY HH:mm" }, "updated_at": "2021-07-31T03:41:40.271Z", "created_at": "2021-06-24T07:22:30.170Z" }

  return (
    <div className="cb_plot">
      <RedashRenderer type="CHART" visualizationName={pro_data.name} options={pro_data.options} data={proData} />
    </div>

  );
}

export default RedashExample;