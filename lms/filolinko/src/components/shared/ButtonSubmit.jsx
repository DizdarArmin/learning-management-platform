export default function ButtonSubmit({ value }) {
  return (
    <button
      type="submit"
      className="button-submit"
      onClick={() => console.log()}
    >
      {value}
    </button>
  );
}
