import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useDocument from "../hooks/useDocument";
import useCollection from "../hooks/useCollection";

import File from "./shared/File";
import FileControls from "./shared/FileControls";
import { useRecoilState } from "recoil";
import { filesReload } from "../state/triggers";

export default function TeacherCourse() {
  const [reload] = useRecoilState(filesReload);
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [files, setFiles] = useState([]);

  const { document } = useDocument("/courses", id);

  const path = `/courses/${id}/files`;
  const { collection } = useCollection(path, reload);

  useEffect(() => {
    setFiles(collection);
  }, [collection]);

  useEffect(() => {
    setCourse(document);
  }, [document]);

  return (
    <div className="container-fluid">
      <div className="container">
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
