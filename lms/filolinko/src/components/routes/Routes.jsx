import { useEffect, useState } from "react";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";
import { Route } from "react-router";

import Navbar from "../shared/Navbar";
import Profile from "../../view/Profile";
import Students from "../../view/Students";
import Loading from "../../view/Loading";
import CourseNotFound from "../../view/CourseNotFound";

import { useAuth } from "../../state/AuthContext";
import useDocument from "../../hooks/useDocument";
import StudentCourse from "../StudentCourse";
import TeacherCourse from "../TeacherCourse";
import TeacherCourses from "../TeacherCourses";
import StudentCourses from "../StudentCourses";
import Recover from "../../view/Recover";

export default function Routes() {
  const { currentUser, userData, setUserData } = useAuth();
  const [id, setId] = useState(null);
  const { document, documentLoading } = useDocument("users", id);

  useEffect(() => {
    if (currentUser) {
      setId(currentUser.uid);
    }
  }, [currentUser]);

  useEffect(() => {
    setUserData(document);
  }, [document]);
  const teacher = userData.role === "teacher";
  if (documentLoading) return <Loading />;
  return (
    <>
      <Navbar role={userData.role} />
      <RoleRoute path="/students" component={Students} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute
        path="/course/:id"
        component={teacher ? TeacherCourse : StudentCourse}
      />
      <PrivateRoute
        path="/courses"
        component={teacher ? TeacherCourses : StudentCourses}
      />
    </>
  );
}
