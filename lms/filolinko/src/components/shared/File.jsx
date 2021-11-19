import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { filesDelete, filesReload } from "../../state/triggers";
import { FileType } from "../../scripts/fileType";
import { removeDocument } from "../../scripts/fireStore";
import { removeFile } from "../../scripts/storage";
import Icons from "../../data/Icons.json";
import Modal from "./Modal";
import EditFile from "./EditFile";

export default function File({ hook }) {
  const [modal, setShowModal] = useState(false);
  const [item, id] = hook;
  const [reload, setReload] = useRecoilState(filesReload);
  const [remove] = useRecoilState(filesDelete);
  const [wiggle, setWiggle] = useState("");

  useEffect(() => {
    if (remove) {
      setWiggle("wiggle-active");
    } else {
      setWiggle("");
    }
  }, [remove]);

  async function removeItem() {
    await removeDocument(`/courses/${id}/files`, item.id);
    if (item.type !== "link") {
      await removeFile(item.ref);
    }
    setReload(!reload);
  }

  return (
    <div className={`item ${wiggle}`}>
      <span>
        {remove && (
          <i onClick={() => removeItem()} className={Icons.removeSmall} />
        )}
      </span>
      <i onClick={() => setShowModal(true)} className={FileType(item.type)} />
      <p className="item-name">{item.name}</p>
      <a href={item.url} download target="_blank">
        {item.type === "link" ? "Open Link" : "Download"}
      </a>
      <Modal hook={[modal, setShowModal]}>
        <EditFile
          hook={[item, modal, setShowModal, id, item.id, reload, setReload]}
        />
      </Modal>
    </div>
  );
}
