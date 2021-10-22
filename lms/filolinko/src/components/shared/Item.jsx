export default function Item({ to, icon, activate }) {
  return (
    <div className="profile-link" onClick={activate}>
      <i className={`fas fa-2x fa-${icon}`} />
      {to}
    </div>
  );
}
