const NodeSelect = ({ label, value, onChange, options }) => (
  <div className="mb-2">
    <label className="block text-sm text-gray-700">
      {label}:
      <select
        value={value}
        onChange={onChange}
        className="w-full mt-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export default NodeSelect;
