import React, { useState } from "react";
import BaseNode from "./BaseNode";
import NodeInput from "./NodeInput";

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || "");

  return (
    <BaseNode
      id={id}
      title="Filter"
      inputs={[{ id: "input" }]}
      outputs={[{ id: "true" }, { id: "false" }]}
    >
      <NodeInput
        label="Condition"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
      />
    </BaseNode>
  );
};
