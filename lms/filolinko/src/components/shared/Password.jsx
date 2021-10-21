import { useRef, useState } from "react";

export default function PasswordInput({ props }) {
  const [password, setPassword] = useState(false);
  const [state, onChange, error, html] = props;
  const { key, label, type, placeholder } = html;

  const ref = useRef(null);

  let localType = type;
  let icon = "fas fa-eye";
  if (password) {
    localType = "text";
    icon = "fas fa-eye-slash";
  } else {
    localType = type;
    icon = "fas fa-eye";
  }
  return (
    <label className="input">
      {label}
      <div>
        <input
          onChange={() => onChange(key, ref.current.value)}
          value={state}
          ref={ref}
          required
          type={localType}
          placeholder={placeholder}
        />
        <i onClick={() => setPassword(!password)} className={icon} />
      </div>
      <small>{error}</small>
    </label>
  );
}
