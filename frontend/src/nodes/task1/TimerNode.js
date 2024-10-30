import React, { useState } from "react";
import BaseNode from "./BaseNode";
import NodeInput from "./NodeInput";
import NodeSelect from "./NodeSelect";
export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);
  const [unit, setUnit] = useState(data?.unit || "ms");

  return (
    <BaseNode
      id={id}
      title="Timer"
      inputs={[{ id: "trigger" }]}
      outputs={[{ id: "timeout" }]}
    >
      <NodeInput
        label="Delay"
        type="number"
        value={delay}
        onChange={(e) => setDelay(e.target.value)}
      />
      <NodeSelect
        label="Unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        options={[
          { value: "ms", label: "Milliseconds" },
          { value: "s", label: "Seconds" },
          { value: "m", label: "Minutes" },
        ]}
      />
    </BaseNode>
  );
};
