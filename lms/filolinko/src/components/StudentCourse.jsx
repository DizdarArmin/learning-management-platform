import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import useDocument from "../hooks/useDocument";
import useCollection from "../hooks/useCollection";
import CourseNotFound from "../view/CourseNotFound";
import { back } from "../data/Icons.json";

import StudentFile from "../components/shared/StudentFile";

export default function StudentCourse() {
  const { id } = useParams();
  const history = useHistory();
  const [course, setCourse] = useState({});
  const [files, setFiles] = useState([]);
  const { document } = useDocument("courses", id);
  const path = `/courses/${id}/files`;
  const { collection } = useCollection(path, null);

  useEffect(() => {
    setFiles(collection);
  }, [collection]);

  useEffect(() => {
    setCourse(document);
  }, [document]);

  if (!course) return <CourseNotFound />;
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="course">
          <div className="controls">
            <h3>{course.name}</h3>
            <i onClick={history.goBack} className={back} />
          </div>
          <div className="wrapper">
            <div className="folders">
              {files.map((item) => (
                <StudentFile key={item.id} hook={[item, id]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
