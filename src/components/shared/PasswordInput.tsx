import { useState } from "react";

export default function PasswordInput({ HTML, hook }) {
  const [password, setPassword] = useState(false);
  const { label, type, placeholder } = HTML;
  const [state, set] = hook;

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
          required
          type={localType}
          placeholder={placeholder}
          value={state}
          onChange={(event) => set(event.target.value)}
        />
        <i onClick={() => setPassword(!password)} className={icon} />
      </div>
    </label>
  );
}
