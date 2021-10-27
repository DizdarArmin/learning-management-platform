import { useEffect, useState } from "react";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

import Profile from "../../view/Profile";
import Courses from "../../view/Courses";
import Students from "../../view/Students";
import Loading from "../../view/Loading";

import { useAuth } from "../../state/AuthContext";
import useDocument from "../../hooks/useDocument";

import Course from "../../view/Course";
import Navbar from "./Navbar";

export default function LoggedRoutes() {
  const { currentUser, userData, setUserData } = useAuth();
  const [id, setId] = useState("");
  const { document, documentLoading } = useDocument("users", id);

  useEffect(() => {
    if (id.length < 1) {
      if (currentUser) {
        setId(currentUser.uid);
      }
    }
  }, []);

  useEffect(() => {
    setUserData(document);
  }, [document]);

  if (documentLoading) return <Loading />;
  return (
    <>
      <Navbar role={userData.role} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/courses" component={Courses} />
      <RoleRoute path="/students" component={Students} />
      <PrivateRoute path="/course/:id" component={Course} />
    </>
  );
}
