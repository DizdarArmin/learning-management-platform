export default function Button({ value, handler }) {
  return (
    <div className="button-submit" onClick={() => handler()}>
      {value}
    </div>
  );
}
