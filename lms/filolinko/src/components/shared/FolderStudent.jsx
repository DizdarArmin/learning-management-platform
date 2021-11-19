import { Link } from "react-router-dom";
import Modal from "./Modal";
import { folder } from "../../data/Icons.json";
import { useState } from "react";
import DateTime from "./DateTime";

export default function FolderStudent({ item }) {
  const [modal, setModal] = useState(false);
  return (
    <div className="item">
      <Link to={`/course/${item.id}`}>
        <i className={folder} />
      </Link>
      <p onClick={() => setModal(true)} className="item-name clamp">
        {item.name}
      </p>
      <Modal hook={[modal, setModal]}>
        {item.name}
        <br />
        <span>by: {item.by}</span>
        <br />
        <span>
          <DateTime timestamp={item.createdAt.seconds} />
        </span>
      </Modal>
      <small className="item-name clamp">
        <span>{item.by}</span>
      </small>
    </div>
  );
}
