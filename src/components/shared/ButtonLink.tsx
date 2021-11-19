export default function ButtonLink({ value, handler }) {
  return (
    <div className="button-link" onClick={() => handler()}>
      {value}
    </div>
  );
}
