import { useRedashQueryData } from "../redash/redashData.js";
import  RedashRenderer  from "../redash/Renderer";

// query, id.
// plot configuration

function CbLessPlot() {
  const proData = useRedashQueryData(31) //  (31,46) # queries/31/source#46
  let pro_data = { "id": 46, "type": "CHART", "name": "Chart", "description": "", "options": { "globalSeriesType": "line", "sortX": true, "legend": { "enabled": true, "placement": "auto", "traceorder": "normal" }, "xAxis": { "type": "datetime", "labels": { "enabled": true }, "title": { "text": "\u65e5\u671f" } }, "yAxis": [{ "type": "linear", "title": { "text": "\u53ef\u8f6c\u503a\u6570\u91cf" } }, { "type": "linear", "opposite": true }], "alignYAxesAtZero": false, "error_y": { "type": "data", "visible": true }, "series": { "stacking": null, "error_y": { "type": "data", "visible": true } }, "seriesOptions": { "total": { "zIndex": 1, "index": 0, "type": "line", "name": "\u603b\u6570\u91cf", "yAxis": 0 }, "less_100": { "zIndex": 0, "index": 0, "type": "line", "name": "\u4ef7\u683c<100 \u6570\u91cf", "yAxis": 0 } }, "valuesOptions": {}, "columnMapping": { "total": "y", "less_100": "y", "trade_date": "x" }, "direction": { "type": "counterclockwise" }, "sizemode": "diameter", "coefficient": 1, "numberFormat": "0,0[.]00000", "percentFormat": "0[.]00%", "textFormat": "", "missingValuesAsZero": true, "showDataLabels": false, "dateTimeFormat": "DD/MM/YY HH:mm", "customCode": "// Available variables are x, ys, element, and Plotly\n// Type console.log(x, ys); for more info about x and ys\n// To plot your graph call Plotly.plot(element, ...)\n// Plotly examples and docs: https://plot.ly/javascript/" }, "updated_at": "2021-01-26T13:47:20.136Z", "created_at": "2021-01-26T13:35:22.645Z" }

  return (
    <div class="cb_plot">
      <RedashRenderer type="CHART" visualizationName={pro_data.name} options={pro_data.options} data={proData} />
    </div>

  );
}

export default CbLessPlot;