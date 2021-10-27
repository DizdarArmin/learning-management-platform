import { useEffect, useState } from "react";

import useQueryCollection from "../hooks/useQueryCollection";
import { useAuth } from "../state/AuthContext";
import Folder from "./shared/Folder";
import AddRemove from "./shared/AddRemove";

export default function CoursesTeacher(id) {
  const { courses, setCourses } = useAuth();
  const [reload, triggerReload] = useState(false);
  const { collection } = useQueryCollection("courses", id, reload);
  const [remove, toggleRemove] = useState(false);
  const [wiggle, setWiggle] = useState("");

  useEffect(() => {
    setCourses(collection);
  }, [collection]);

  courses.sort(function (a, b) {
    return b.createdAt.toString().localeCompare(a.createdAt.toString());
  });
  const Courses = courses.map((item) => (
    <Folder
      key={item.id}
      item={item}
      hook={[reload, triggerReload, remove, item]}
    />
  ));

  return (
    <div className="courses">
      <div className="top">
        <h3>Courses</h3>
        <AddRemove
          hook={[id, remove, toggleRemove, setWiggle, reload, triggerReload]}
        />
      </div>
      <div className="wrapper">
        <div className="folders">{Courses}</div>
      </div>
    </div>
  );
}
