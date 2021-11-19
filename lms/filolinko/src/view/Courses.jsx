import TeacherCourses from "../components/TeacherCourses";
import StudentCourses from "../components/StudentCourses";
import { useAuth } from "../state/AuthContext";
export default function Courses() {
  const { userData } = useAuth();

  return (
    <div className="container-fluid">
      <div className="container padding">
        {userData.role === "teacher" && <TeacherCourses id={userData.id} />}
        {userData.role === "student" && <StudentCourses />}
      </div>
    </div>
  );
}
