import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useDocument from "../hooks/useDocument";
import useCollection from "../hooks/useCollection";
import CourseNotFound from "./CourseNotFound";
import UploadFile from "../components/shared/UploadFile";
import File from "../components/shared/File";
import FileControls from "../components/shared/FileControls";
import { useRecoilState } from "recoil";
import { filesDelete, filesReload } from "../state/triggers";

export default function Course() {
  const [reload, setReload] = useRecoilState(filesReload);

  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [files, setFiles] = useState([]);
  const { document, documentLoading } = useDocument("courses", id);

  const path = `/courses/${id}/files`;
  const { collection } = useCollection(path, reload);

  useEffect(() => {
    setFiles(collection);
  }, [collection]);

  useEffect(() => {
    setCourse(document);
  }, [document]);

  if (!course) return <CourseNotFound />;
  return (
    <div className="container-fluid">
      <div className="container padding">
        <div className="course">
          <FileControls course={course} />

          <div className="wrapper">
            <div className="folders">
              {files.map((item) => (
                <File key={item.id} hook={[item, id]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
