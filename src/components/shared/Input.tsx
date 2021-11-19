export default function Input({ HTML, hook }) {
  const { label, type, placeholder } = HTML;
  const [state, set] = hook;
  return (
    <label className="input">
      {label}
      <div>
        <input
          required
          type={type}
          placeholder={placeholder}
          value={state}
          onChange={(event) => set(event.target.value)}
        />
      </div>
    </label>
  );
}
