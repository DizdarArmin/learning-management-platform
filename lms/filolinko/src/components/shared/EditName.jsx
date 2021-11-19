import { useState } from "react";
import { updateDocument } from "../../scripts/fireStore";
import { useRecoilState } from "recoil";
import { coursesReload } from "../../state/triggers";
import HTML from "../../data/SignUpAttributes.json";
import Input from "./Input";
export default function EditName({ hook }) {
  const [reload, setReload] = useRecoilState(coursesReload);
  const [item, modal, setShowModal] = hook;
  const [newName, setNewName] = useState(item.name);
  const [error, setError] = useState();

  async function updateName(e) {
    e.preventDefault();
    if (newName.length > 2) {
      await updateDocument("courses", item.id, {
        name: newName,
      });
      setReload(!reload);
      setShowModal(!modal);
      setError("");
    } else {
      setError("New name can't be less then 3 characters.");
    }
  }
  return (
    <form onSubmit={updateName}>
      <Input hook={[newName, setNewName, HTML.name]} />
      <div className="buttons">
        <button type="submit" className="button-submit">
          Update
        </button>
        <button onClick={() => setShowModal(false)} className="button-cancel">
          Cancel
        </button>
      </div>
    </form>
  );
}
