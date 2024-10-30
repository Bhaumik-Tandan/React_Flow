export const NodeInput = ({ label, value, onChange, type = "text" }) => (
  <label style={{ display: "block", marginBottom: "4px" }}>
    {label}:
    <input
      type={type}
      value={value}
      onChange={onChange}
      style={{ width: "100%", padding: "2px 4px" }}
    />
  </label>
);

export const NodeSelect = ({ label, value, onChange, options }) => (
  <label style={{ display: "block", marginBottom: "4px" }}>
    {label}:
    <select
      value={value}
      onChange={onChange}
      style={{ width: "100%", padding: "2px 4px" }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </label>
);
