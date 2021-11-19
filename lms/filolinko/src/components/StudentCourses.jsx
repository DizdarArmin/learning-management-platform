import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { coursesReload } from "../state/triggers";
import useCollection from "../hooks/useCollection";
import { useAuth } from "../state/AuthContext";
import Loading from "../view/Loading";
import FolderStudent from "./shared/FolderStudent";

export default function StudentCourses() {
  const [reload] = useRecoilState(coursesReload);
  const { courses, setCourses } = useAuth();

  const { collection, collectionLoading } = useCollection("courses", null);

  useEffect(() => {
    setCourses(collection);
  }, [collection, setCourses]);

  courses.sort(function (a, b) {
    return b.createdAt.toString().localeCompare(a.createdAt.toString());
  });
  const Courses = courses.map((item) => (
    <FolderStudent key={item.id} item={item} />
  ));
  if (collectionLoading) return <Loading />;
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="courses">
          <h3 className="controls">Courses</h3>
          <div className="wrapper">
            <div className="folders">{Courses}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
