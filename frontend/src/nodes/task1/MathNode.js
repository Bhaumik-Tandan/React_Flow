import React, { useState } from "react";
import BaseNode from "./BaseNode";
import NodeSelect from "./NodeSelect";
export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || "add");

  return (
    <BaseNode
      id={id}
      title="Math"
      inputs={[
        { id: "a", label: "A" },
        { id: "b", label: "B" },
      ]}
      outputs={[{ id: "result" }]}
    >
      <NodeSelect
        label="Operation"
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        options={[
          { value: "add", label: "Add" },
          { value: "subtract", label: "Subtract" },
          { value: "multiply", label: "Multiply" },
          { value: "divide", label: "Divide" },
        ]}
      />
    </BaseNode>
  );
};
