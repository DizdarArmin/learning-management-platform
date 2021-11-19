import { useState } from "react";
import Student from "../components/shared/Student";
import useStudents from "../hooks/useStudents";
export default function Students() {
  const [reload, setReload] = useState(true);
  const { collection } = useStudents("users", "student", reload);
  return (
    <div className="container-fluid text">
      <div className="container padding">
        <h3>Students</h3>
        <div className="students">
          {collection.map((item) => (
            <Student hook={[item, reload, setReload]} />
          ))}
        </div>
      </div>
    </div>
  );
}
