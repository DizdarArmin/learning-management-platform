import useCollection from "../components/hooks/useCollection";
import Navbar from "../components/shared/Navbar";

export default function Students() {
  const { data: students, status } = useCollection("users");
  if (status === 1) return <div>Loading</div>;

  const Students = students.map((item) => <div key={item.id}>{item.name}</div>);
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="container">
        <h1>Students</h1>
        {students.length > 0 && Students}
      </div>
    </div>
  );
}
