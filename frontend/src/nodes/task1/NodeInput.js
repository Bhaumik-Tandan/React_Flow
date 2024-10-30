import React from 'react';

const NodeInput = ({ label, value, onChange, type = "text" }) => (
  <div className="mb-2">
    <label className="block text-sm text-gray-700">
      {label}:
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full mt-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </label>
  </div>
);

export default NodeInput;