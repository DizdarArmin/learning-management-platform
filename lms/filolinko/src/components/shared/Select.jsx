import { useState } from "react";
export default function Select({ props }) {
  const [state, onChange, error, html] = props;
  const { key, label, list } = html;
  const [dropdown, setDropdown] = useState(false);

  function Select(item) {
    onChange(key, item);
    setDropdown(!dropdown);
  }

  return (
    <label className="select">
      {label}
      <div onClick={() => setDropdown(!dropdown)} className="selected">
        {state}
      </div>
      {dropdown && (
        <div className="dropdown">
          {list.map((item) => (
            <div key={item} onClick={() => Select(item)} className="option">
              {item}
            </div>
          ))}
        </div>
      )}
      <small>{error}</small>
    </label>
  );
}
