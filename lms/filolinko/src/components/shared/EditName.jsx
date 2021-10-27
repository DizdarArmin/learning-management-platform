import { useState } from "react";
import { updateDocument } from "../../scripts/fireStore";
import { useRecoilState } from "recoil";
import { coursesReload } from "../../state/triggers";
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
    <form onSubmit={(e) => updateName(e)}>
      <label className="input">
        Edit name
        <div>
          <input
            autoFocus
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
            type="text"
            required
          />
        </div>
        <small>{error}</small>
      </label>
      <button type="submit" className="button-submit">
        Update
      </button>
    </form>
  );
}
