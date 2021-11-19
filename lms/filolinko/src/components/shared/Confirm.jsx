export default function Confirm({ value, yes, no }) {
  return (
    <div className="confirm">
      <p>Are you sure you want to {value}?</p>
      <div className="confirm-buttons">
        <button onClick={() => yes()} className="yes">
          Yes
        </button>
        <button onClick={() => no()} className="no">
          No
        </button>
      </div>
    </div>
  );
}
