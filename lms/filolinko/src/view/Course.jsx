import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import useDocument from "../hooks/useDocument";
import useCollection from "../hooks/useCollection";
import { useAuth } from "../state/AuthContext";

import CourseNotFound from "./CourseNotFound";
import UploadFile from "../components/shared/UploadFile";
import File from "../components/shared/File";

export default function Course() {
  const { id } = useParams();
  const history = useHistory();
  const [reload, triggerReload] = useState();
  const [course, setCourse] = useState({});
  const [files, setFiles] = useState([]);
  const { currentUser } = useAuth();
  const { document, documentLoading } = useDocument("courses", id);

  const path = `/courses/${id}/files`;
  const { collection } = useCollection(path, currentUser.uid, reload);

  useEffect(() => {
    setFiles(collection);
  }, [collection]);

  useEffect(() => {
    setCourse(document);
  }, [document]);

  function goBack() {
    history.goBack();
  }

  if (!course) return <CourseNotFound />;
  return (
    <div className="container-fluid">
      <div className="container padding">
        <div className="course">
          <div className="course-top">
            <h3>{course.name}</h3>
            <i
              onClick={goBack}
              className="fas fa-2x fa-arrow-alt-circle-left"
            />
          </div>
          <UploadFile id={id} reload={triggerReload} />
          {files.map((item) => (
            <File key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
