export default function Input({ hook }) {
  const [state, onChange, html] = hook;
  const { label, placeholder, type, required } = html;
  return (
    <label className="input">
      {label}
      <div>
        <input
          onChange={(e) => onChange(e.target.value)}
          value={state}
          placeholder={placeholder}
          type={type}
          required={required}
        />
      </div>
    </label>
  );
}
