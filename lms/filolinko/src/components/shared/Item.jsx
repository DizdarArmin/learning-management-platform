export default function Item({ to, icon, click }) {
  return (
    <div className="profile-link" onClick={click}>
      <i className={icon} />
      {to}
    </div>
  );
}
