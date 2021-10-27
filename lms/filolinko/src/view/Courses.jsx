import CoursesTeacher from "../components/CoursesTeacher";
import CoursesStudent from "../components/CoursesStudent";
import { useAuth } from "../state/AuthContext";
export default function Courses() {
  const { userData } = useAuth();

  return (
    <div className="container-fluid">
      <div className="container padding">
        {userData.role === "teacher" && <CoursesTeacher id={userData.id} />}
        {userData.role === "student" && <CoursesStudent />}
      </div>
    </div>
  );
}
