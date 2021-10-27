import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { coursesReload, coursesDelete } from "../state/triggers";
import useQueryCollection from "../hooks/useQueryCollection";
import { useAuth } from "../state/AuthContext";
import Folder from "./shared/Folder";
import FolderControls from "./shared/FolderControls";

export default function CoursesTeacher(id) {
  const { courses, setCourses } = useAuth();
  const [reload, setReload] = useRecoilState(coursesReload);
  const [remove, toggleRemove] = useRecoilState(coursesDelete);
  const { collection } = useQueryCollection("courses", id, reload);
  const [wiggle, setWiggle] = useState("");

  useEffect(() => {
    setCourses(collection);
  }, [collection]);

  courses.sort(function (a, b) {
    return b.createdAt.toString().localeCompare(a.createdAt.toString());
  });
  const Courses = courses.map((item) => (
    <Folder key={item.id} hook={[remove, item]} />
  ));

  return (
    <div className="courses">
      <FolderControls ownerID={id} />
      <div className="wrapper">
        <div className="folders">{Courses}</div>
      </div>
    </div>
  );
}
