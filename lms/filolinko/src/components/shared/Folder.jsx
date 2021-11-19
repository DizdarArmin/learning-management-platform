import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { folder, removeSmall } from "../../data/Icons.json";
import { coursesReload, coursesDelete } from "../../state/triggers";
import DateTime from "./DateTime";
import useCollection from "../../hooks/useCollection";
import { removeCourse } from "../../scripts/crud";
import Modal from "./Modal";
import EditName from "./EditName";
import Confirm from "./Confirm";

export default function Folder({ item }) {
  const [reload, setReload] = useRecoilState(coursesReload);
  const [remove] = useRecoilState(coursesDelete);
  const [modal, setShowModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [wiggle, setWiggle] = useState("");

  const { collection } = useCollection(`/courses/${item.id}/files`, reload);

  useEffect(() => {
    if (remove) {
      setWiggle("wiggle-active");
    } else {
      setWiggle("");
    }
  }, [remove]);

  async function removeFolder() {
    setRemoveModal(false);
    await removeCourse(collection, item.id);
    setReload(!reload);
  }

  return (
    <div className={`item ${wiggle}`}>
      <span>
        {remove && (
          <i onClick={(e) => setRemoveModal(true)} className={removeSmall} />
        )}
      </span>
      <Link to={`/course/${item.id}`}>
        <i className={folder} />
      </Link>
      <div className="item-name clamp" onClick={() => setShowModal(true)}>
        {item.name}
      </div>
      <DateTime timestamp={item.createdAt.seconds} />

      <Modal hook={[modal, setShowModal]}>
        <EditName hook={[item, modal, setShowModal]} />
      </Modal>

      <Modal hook={[removeModal, setRemoveModal]}>
        <Confirm
          value={`remove ${item.name}`}
          yes={removeFolder}
          no={() => setRemoveModal(false)}
        />
      </Modal>
    </div>
  );
}
