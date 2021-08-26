import React, { useState, useEffect } from "react";
import { get } from "lodash";
import { Editor, Renderer, registeredVisualizations } from "@redash/viz";
import { Form, Select, Button } from "antd";
import VisualizationTypeSelect from "./components/VisualizationTypeSelect";
import { useRedashQueryData, useRedashQueries } from "./redashPreview";

export default function App() {
  const [type, setType] = useState("TABLE");
  const [queryId, setQueryId] = useState();
  const [options, setOptions] = useState({});
  const [queries, loadingQueries] = useRedashQueries();
  const data = useRedashQueryData(queryId, queries);
  const config = get(registeredVisualizations, type);

  useEffect(() => {
    // reset options when type or data changes
    setOptions({});
  }, [type, data]);

  useEffect(() => {
    if (data) {
      console.log("Loaded data:");
      console.log(data);
    }
  }, [data]);

  return (
    <div className="App">
      <Form>
        <Form.Item
          label={
            <>
              Query (from{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://redash-preview.netlify.app"
              >
                Redash Preview
              </a>
              )
            </>
          }
        >
          <Select
            placeholder="Select Query"
            loading={loadingQueries}
            disabled={loadingQueries}
            value={queryId}
            onChange={setQueryId}
          >
            {queries.map(query => (
              <Select.Option key={`${query.id}`} value={query.id}>
                {query.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Visualization Type">
          <VisualizationTypeSelect value={type} onChange={setType} />
        </Form.Item>
      </Form>

      {type && data && (
        <div className="visualization-example">
          <div className="visualization-editor">
            <Editor
              type={type}
              options={config.getOptions(options, data)}
              onOptionsChange={setOptions}
              data={data}
            />
            <Button
              style={{ marginTop: 20 }}
              onClick={() => {
                console.log("Visualization Options:");
                console.log(config.getOptions(options, data));
              }}
            >
              Log Options
            </Button>
          </div>
          <div className="visualization-renderer">
            <Renderer type={type} options={options} data={data} />
          </div>
        </div>
      )}
    </div>
  );
}
