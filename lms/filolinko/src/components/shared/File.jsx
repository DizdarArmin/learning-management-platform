export default function File({ item }) {
  return (
    <div>
      <p>{item.name}</p>
      <a href={item.url} src={item.url} alt="donwload" download target="_blank">
        Download
      </a>
    </div>
  );
}
