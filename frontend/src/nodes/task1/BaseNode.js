import React from 'react';
import { Handle, Position } from 'reactflow';

const BaseNode = ({
  id,
  title,
  inputs = [],
  outputs = [],
  children,
  className = '',
  width = 200,
  height = 80,
}) => {
  return (
    <div 
      style={{ 
        width, 
        height, 
        border: '1px solid black',
        borderRadius: '4px',
        padding: '8px',
        background: 'white'
      }}
      className={className}
    >
      {/* Input handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`${id}-${input.id}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{
            top: `${((index + 1) * 100) / (inputs.length + 1)}%`,
            ...input.style
          }}
        />
      ))}

      <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
        {title}
      </div>

      {children}

      {outputs.map((output, index) => (
        <Handle
          key={`${id}-${output.id}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{
            top: `${((index + 1) * 100) / (outputs.length + 1)}%`,
            ...output.style
          }}
        />
      ))}
    </div>
  );
};

export default BaseNode;