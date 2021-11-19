import { FileType } from "../../scripts/fileType";
import { useState } from "react";
import Modal from "../shared/Modal";
export default function File({ hook }) {
  const [modal, setModal] = useState(false);
  const [item] = hook;

  function onClick() {
    setModal(true);
  }

  return (
    <div className="item">
      <Modal hook={[modal, setModal]}>{item.name}</Modal>
      <i onClick={() => onClick()} className={FileType(item.type)} />
      <p className="item-name">{item.name}</p>
      <a href={item.url} id="download" target="_blank">
        {item.type === "link" ? "Open link" : "Download"}
      </a>
    </div>
  );
}
