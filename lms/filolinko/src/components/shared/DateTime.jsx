export default function getDateTime({ timestamp }) {
  const date = new Date(timestamp * 1000);
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear().toString();
  const hour = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  return (
    <small>
      <span>
        {hour}:{minutes}&nbsp;
      </span>
      <span>
        {day}.{month}.{year}
      </span>
    </small>
  );
}
