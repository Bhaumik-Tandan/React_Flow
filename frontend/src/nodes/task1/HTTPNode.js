import React, { useState } from "react";
import BaseNode from "./BaseNode";
import NodeInput from "./NodeInput";
import NodeSelect from "./NodeSelect";
export const HTTPNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || "");
  const [method, setMethod] = useState(data?.method || "GET");

  return (
    <BaseNode
      id={id}
      title="HTTP Request"
      inputs={[{ id: "body" }, { id: "headers" }]}
      outputs={[{ id: "response" }, { id: "error" }]}
    >
      <NodeInput
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <NodeSelect
        label="Method"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        options={[
          { value: "GET", label: "GET" },
          { value: "POST", label: "POST" },
          { value: "PUT", label: "PUT" },
          { value: "DELETE", label: "DELETE" },
        ]}
      />
    </BaseNode>
  );
};
