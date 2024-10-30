import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Settings, Type, FileText, Bot, ArrowRight } from 'lucide-react';

const nodeStyles = {
  nodeBase: "bg-white rounded-lg shadow-lg border border-gray-200 transition-all hover:shadow-xl",
  header: "flex items-center gap-2 p-3 border-b border-gray-100 bg-gray-50 rounded-t-lg",
  headerIcon: "text-gray-500",
  headerText: "font-medium text-gray-700",
  content: "p-4",
  label: "block text-sm text-gray-600 mb-1",
  input: "w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  select: "w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  handleCommon: "w-3 h-3 rounded-full bg-blue-500 border-2 border-white"
};

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <div className={`${nodeStyles.nodeBase} w-64`}>
      <div className={nodeStyles.header}>
        <Type size={16} className={nodeStyles.headerIcon} />
        <span className={nodeStyles.headerText}>Input</span>
      </div>
      <div className={nodeStyles.content}>
        <label className="mb-3 block">
          <span className={nodeStyles.label}>Name</span>
          <input 
            type="text"
            className={nodeStyles.input}
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
          />
        </label>
        <label>
          <span className={nodeStyles.label}>Type</span>
          <select 
            className={nodeStyles.select}
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        className={nodeStyles.handleCommon}
      />
    </div>
  );
};

export const LLMNode = ({ id }) => {
  return (
    <div className={`${nodeStyles.nodeBase} w-64`}>
      <div className={nodeStyles.header}>
        <Bot size={16} className={nodeStyles.headerIcon} />
        <span className={nodeStyles.headerText}>LLM</span>
      </div>
      <div className={nodeStyles.content}>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Settings size={14} />
          <span>Model: GPT-3.5 Turbo</span>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        className={nodeStyles.handleCommon}
        style={{ top: '33%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        className={nodeStyles.handleCommon}
        style={{ top: '66%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        className={nodeStyles.handleCommon}
      />
    </div>
  );
};

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <div className={`${nodeStyles.nodeBase} w-64`}>
      <div className={nodeStyles.header}>
        <ArrowRight size={16} className={nodeStyles.headerIcon} />
        <span className={nodeStyles.headerText}>Output</span>
      </div>
      <div className={nodeStyles.content}>
        <label className="mb-3 block">
          <span className={nodeStyles.label}>Name</span>
          <input
            type="text"
            className={nodeStyles.input}
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
          />
        </label>
        <label>
          <span className={nodeStyles.label}>Type</span>
          <select
            className={nodeStyles.select}
            value={outputType}
            onChange={(e) => setOutputType(e.target.value)}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
        className={nodeStyles.handleCommon}
      />
    </div>
  );
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  return (
    <div className={`${nodeStyles.nodeBase} w-64`}>
      <div className={nodeStyles.header}>
        <FileText size={16} className={nodeStyles.headerIcon} />
        <span className={nodeStyles.headerText}>Text</span>
      </div>
      <div className={nodeStyles.content}>
        <label>
          <span className={nodeStyles.label}>Text</span>
          <input
            type="text"
            className={nodeStyles.input}
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
          />
        </label>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className={nodeStyles.handleCommon}
      />
    </div>
  );
};

export default {
  task2_input: InputNode,
  task2_llm: LLMNode,
  task2_output: OutputNode,
  task2_text: TextNode
};