import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { removeDocument, updateDocument } from "../../scripts/fireStore";
import DateTime from "./DateTime";
export default function Folder({ hook }) {
  const [reload, triggerReload, remove, item] = hook;
  const [name, setName] = useState(item.name);
  const [wiggle, setWiggle] = useState("");

  useEffect(() => {
    if (remove) {
      setWiggle("wiggle-active");
    } else {
      setWiggle("");
    }
  }, [remove]);

  async function removeCourse(e) {
    e.preventDefault();
    let confirmDelete = window.confirm(
      "Are you sure you want to delete " + item.name
    );
    if (confirmDelete) {
      await removeDocument("courses", item.id);
      triggerReload(!reload);
    } else return null;
  }

  async function editName(e) {
    e.preventDefault();
    let newName = prompt("Type new name", item.name);
    if (newName) {
      if (newName.length > 3) {
        setName(newName);
        await updateDocument("courses", item.id, { name: newName });
        triggerReload(reload);
      } else {
        alert("Name can't be less then 3 characters.Try again");
        editName();
      }
    } else {
      return null;
    }
  }

  console.log(typeof item.createdAt.toString());
  return (
    <div className={`folder ${wiggle}`}>
      <span>
        {remove && (
          <i onClick={(e) => removeCourse(e)} className="fas fa-trash-alt" />
        )}
      </span>
      <Link to={`/course/${item.id}`}>
        <i className="fas fa-4x fa-folder" />
      </Link>
      <div onClick={(e) => editName(e)}>{name}</div>
      <DateTime timestamp={item.createdAt.seconds} />
    </div>
  );
}
