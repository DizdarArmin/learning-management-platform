import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { coursesReload } from "../state/triggers";
import useQueryCollection from "../hooks/useQueryCollection";
import { useAuth } from "../state/AuthContext";
import Folder from "./shared/Folder";
import FolderControls from "./shared/FolderControls";
import Loading from "../view/Loading";

export default function TeacherCourses() {
  const { courses, setCourses, userData } = useAuth();
  const [reload] = useRecoilState(coursesReload);
  const { collection, collectionLoading } = useQueryCollection(
    "courses",
    userData.id,
    reload
  );

  useEffect(() => {
    setCourses(collection);
  }, [collection, setCourses]);

  courses.sort(function (a, b) {
    return b.createdAt.toString().localeCompare(a.createdAt.toString());
  });

  const Courses = courses.map((item) => <Folder key={item.id} item={item} />);

  if (collectionLoading) return <Loading />;
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="courses">
          <FolderControls data={userData} />
          <div className="wrapper">
            <div className="folders">{Courses}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
