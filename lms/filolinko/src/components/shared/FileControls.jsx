import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Icons from "../../data/Icons.json";
import { filesDelete } from "../../state/triggers";
import Modal from "./Modal";
import UploadFile from "./UploadFile";

export default function FileControls({ course }) {
  const history = useHistory();
  const [modal, setShowModal] = useState(false);
  const [remove, toggleRemove] = useRecoilState(filesDelete);

  useEffect(() => {
    toggleRemove(false);
  }, []);

  return (
    <div className="controls">
      <h3>{course.name}</h3>
      <div>
        <i onClick={history.goBack} className={Icons.back} />
        <i onClick={() => setShowModal(true)} className={Icons.add} />
        <i onClick={() => toggleRemove(!remove)} className={Icons.remove} />
      </div>

      <Modal hook={[modal, setShowModal]}>
        <UploadFile setShowModal={setShowModal} modal={modal} />
      </Modal>
    </div>
  );
}
