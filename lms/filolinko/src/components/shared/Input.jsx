import { useRef } from "react";

export default function Input({ props }) {
  const [state, onChange, error, html] = props;
  const { key, label, placeholder, type } = html;
  console.log(key);
  const ref = useRef(null);

  return (
    <label className="input">
      {label}
      <div>
        <input
          onChange={() => onChange(key, ref.current.value)}
          value={state}
          ref={ref}
          placeholder={placeholder}
          type={type}
          required
        />
      </div>
      <small>{error}</small>
    </label>
  );
}
