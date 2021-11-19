import { useState } from "react";
import Icons from "../../data/Icons.json";
import { removeDocument } from "../../scripts/fireStore";
import Confirm from "./Confirm";
import Modal from "./Modal";
export default function Student({ hook }) {
  const [modal, setShowModal] = useState(false);
  const [item, reload, setReload] = hook;
  async function onRemove() {
    await removeDocument("users", item.id);
    setReload(!reload);
  }
  return (
    <div className="student">
      {item.name}
      <i onClick={() => setShowModal(true)} className={Icons.removeSmall} />
      <Modal hook={[modal, setShowModal]}>
        <Confirm
          value={`delete ${item.name}`}
          yes={() => onRemove}
          no={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
}
