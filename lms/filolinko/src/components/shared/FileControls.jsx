import { useHistory } from "react-router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import useStorage from "../../hooks/useStorage";

import Icons from "../../data/Icons.json";
import { filesReload, filesDelete } from "../../state/triggers";
import Modal from "./Modal";
import UploadFile from "./UploadFile";
import Progress from "./Progress";
export default function FileControls({ course }) {
  const history = useHistory();
  const [modal, setShowModal] = useState(false);
  const [reload, setReload] = useRecoilState(filesReload);
  const [remove, toggleRemove] = useRecoilState(filesDelete);

  const [file, setFile] = useState(null);
  const { url, progress } = useStorage(file);

  function add() {
    console.log("add");
  }
  function goBack() {
    history.goBack();
  }
  return (
    <div>
      <div className="controls">
        <h3>{course.name}</h3>
        <div>
          <i onClick={goBack} className={Icons.back} />
          <i onClick={() => setShowModal(true)} className={Icons.add} />
          <i onClick={() => toggleRemove(!remove)} className={Icons.remove} />
        </div>

        <Modal hook={[modal, setShowModal]}>
          <UploadFile hook={[url, file, setFile, modal, setShowModal]} />
        </Modal>
      </div>
      <Progress progress={progress} />
    </div>
  );
}
