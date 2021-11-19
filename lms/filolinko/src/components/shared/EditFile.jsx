import { useEffect, useState } from "react";
import Input from "../../components/shared/Input";
import Icons from "../../data/Icons.json";
import { FileType } from "../../scripts/fileType";
import Edit from "../../data/Edit.json";
import UploadFile from "./UploadFile";
import { updateDocument } from "../../scripts/fireStore";
import { removeFile } from "../../scripts/storage";
export default function EditFile({ hook }) {
  const [removed, setRemoved] = useState(false);
  const [item, modal, setShowModal, courseID, itemID, reload, setReload] = hook;
  const [name, setName] = useState(item.name);
  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    if (name === item.name) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    if ((name.length < 3) | (name === "")) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [name]);

  async function removeItem() {
    setRemoved(true);
    await removeFile();
  }

  async function onSubmit(e) {
    e.preventDefault();
    await updateDocument(`/courses/${courseID}/files`, item.id, { name: name });
    setShowModal(false);
    setReload(!reload);
  }
  return (
    <div className="edit-file" onSubmit={onSubmit}>
      {!removed && (
        <form className="upload">
          <Input hook={[name, setName, Edit.name]} />
          <div className="item wiggle-active">
            <span>
              <i onClick={() => removeItem()} className={Icons.removeSmall} />
            </span>
            <i
              onClick={() => setShowModal(true)}
              className={FileType(item.type)}
            />
          </div>
          <div className="buttons">
            <button
              type="submit"
              disabled={isDisabled}
              className="button-submit"
            >
              Submit
            </button>

            <button
              type="reset"
              onClick={() => setShowModal(false)}
              className="button-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {removed && (
        <UploadFile setShowModal={setShowModal} itemID={itemID} modal={modal} />
      )}
    </div>
  );
}
