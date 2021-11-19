import { useState } from "react";

export default function Password({ hook }) {
  const [password, setPassword] = useState(false);
  const [state, setState, html] = hook;
  const { label, type, placeholder } = html;

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
          autoComplete="true"
          onChange={(event) => setState(event.target.value)}
          value={state}
          required
          type={localType}
          placeholder={placeholder}
        />
        <i onClick={() => setPassword(!password)} className={icon} />
      </div>
    </label>
  );
}
