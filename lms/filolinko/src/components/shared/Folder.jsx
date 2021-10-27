import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { coursesReload } from "../../state/triggers";
import DateTime from "./DateTime";
import useCollection from "../../hooks/useCollection";
import { removeCourse } from "../../scripts/crud";
import Modal from "./Modal";
import EditName from "./EditName";

export default function Folder({ hook }) {
  const [reload, setReload] = useRecoilState(coursesReload);
  const [remove, item] = hook;
  const [modal, setShowModal] = useState(false);
  const [wiggle, setWiggle] = useState("");

  const { collection } = useCollection(`/courses/${item.id}/files`, null);

  useEffect(() => {
    if (remove) {
      setWiggle("wiggle-active");
    } else {
      setWiggle("");
    }
  }, [remove]);

  async function removeFolder(e) {
    e.preventDefault();
    let confirmDelete = window.confirm(
      "Are you sure you want to delete " + item.name
    );
    if (confirmDelete) {
      await removeCourse(collection, item.id);
      setReload(!reload);
    } else return null;
  }

  return (
    <div className={`folder ${wiggle}`}>
      <span>
        {remove && (
          <i onClick={(e) => removeFolder(e)} className="fas fa-trash-alt" />
        )}
      </span>
      <Link to={`/course/${item.id}`}>
        <i className="fas fa-4x fa-folder" />
      </Link>
      <div onClick={() => setShowModal(true)}>{item.name}</div>
      <DateTime timestamp={item.createdAt.seconds} />

      <Modal hook={[modal, setShowModal]}>
        <EditName hook={[item, modal, setShowModal]} />
      </Modal>
    </div>
  );
}
