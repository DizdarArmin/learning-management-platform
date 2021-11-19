import { useState } from "react";

export default function Select({ list, hook }) {
  const [state, set] = hook;
  const [dropdown, setDropdown] = useState(false);

  function Select(item) {
    set(item);
    setDropdown(!dropdown);
  }

  return (
    <label className="select">
      {list.label}
      <div onClick={() => setDropdown(!dropdown)} className="selected">
        {state}
      </div>
      {dropdown && (
        <div className="dropdown">
          {list.values.map((item) => (
            <div onClick={() => Select(item)} className="option">
              {item}
            </div>
          ))}
        </div>
      )}
    </label>
  );
}
