export default function Progress({ progress }) {
  const style = {
    width: `${progress}%`,
    height: "5px",
    backgroundColor: "#254e58",
  };
  return (
    <div style={{ width: "100%", backgroundColor: "$secondary" }}>
      <div className="progress" style={style}></div>
    </div>
  );
}
