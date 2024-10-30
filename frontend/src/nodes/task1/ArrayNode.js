import React, { useState } from "react";
import BaseNode from "./BaseNode";
import NodeInput from "./NodeInput";
import NodeSelect from "./NodeSelect";
export const ArrayNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || "map");
  const [code, setCode] = useState(data?.code || "");

  return (
    <BaseNode
      id={id}
      title="Array Operation"
      inputs={[{ id: "array" }]}
      outputs={[{ id: "result" }]}
      height={120}
    >
      <NodeSelect
        label="Operation"
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        options={[
          { value: "map", label: "Map" },
          { value: "filter", label: "Filter" },
          { value: "reduce", label: "Reduce" },
          { value: "sort", label: "Sort" },
        ]}
      />
      <NodeInput
        label="Function"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    </BaseNode>
  );
};
