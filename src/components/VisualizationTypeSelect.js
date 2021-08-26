import React, { useEffect } from "react";
import { filter, sortBy } from "lodash";
import { Select } from "antd";
import { registeredVisualizations } from "@redash/viz";

const availableVisualizations = filter(
  sortBy(registeredVisualizations, ["name"]),
  vis => !vis.isDeprecated && vis.type !== "CHOROPLETH"
);

export default function VisualizationTypeSelect({ value, onChange }) {
  useEffect(() => {
    console.log(
      "Available visualization types:\n" +
        availableVisualizations
          .map(vis => `- ${vis.name}: \`${vis.type}\``)
          .join("\n")
    );
  }, []);

  return (
    <Select
      style={{ width: "100%" }}
      value={value}
      placeholder="Select visualization type"
      onChange={onChange}
    >
      {availableVisualizations.map(vis => (
        <Select.Option key={vis.type}>{vis.name}</Select.Option>
      ))}
    </Select>
  );
}