import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { FileText } from 'lucide-react';

// Regex to match variable patterns like {{variableName}}
const VARIABLE_REGEX = /{{([^{}]+)}}/g;

const nodeStyles = {
  nodeBase: "bg-white rounded-lg shadow-lg border border-gray-200 transition-all hover:shadow-xl",
  header: "flex items-center gap-2 p-3 border-b border-gray-100 bg-gray-50 rounded-t-lg",
  headerIcon: "text-gray-500",
  headerText: "font-medium text-gray-700",
  content: "p-4",
  label: "block text-sm text-gray-600 mb-1",
  handleCommon: "w-3 h-3 rounded-full bg-blue-500 border-2 border-white",
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState(new Set());
  const textareaRef = useRef(null);

  // Function to extract variables from text
  const extractVariables = (text) => {
    const matches = text.match(VARIABLE_REGEX) || [];
    return new Set(
      matches.map(match => match.slice(2, -2).trim()) // Remove {{ and }} and trim whitespace
        .filter(variable => /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(variable)) // Validate JavaScript variable names
    );
  };

  // Update variables when text changes
  useEffect(() => {
    const newVariables = extractVariables(currText);
    setVariables(newVariables);
  }, [currText]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <div className={`${nodeStyles.nodeBase} min-w-64 max-w-96`}>
      <div className={nodeStyles.header}>
        <FileText size={16} className={nodeStyles.headerIcon} />
        <span className={nodeStyles.headerText}>Text</span>
      </div>
      
      <div className={nodeStyles.content}>
        <label>
          <span className={nodeStyles.label}>Text</span>
          <textarea
            ref={textareaRef}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[60px]"
            value={currText}
            onChange={handleTextChange}
            placeholder="Enter text here..."
            rows={1}
          />
        </label>
        
        {/* Variable indicators */}
        {variables.size > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {Array.from(variables).map(variable => (
              <div 
                key={variable}
                className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-md border border-blue-100"
              >
                {variable}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic input handles for variables */}
      {Array.from(variables).map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          className={nodeStyles.handleCommon}
          style={{
            top: `${(index + 1) * (100 / (variables.size + 1))}%`
          }}
        />
      ))}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className={nodeStyles.handleCommon}
      />
    </div>
  );
};

export default TextNode;