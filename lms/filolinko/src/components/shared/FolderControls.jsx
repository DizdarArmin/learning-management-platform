import { useEffect } from "react";
import { addCourse } from "../../scripts/crud";
import Icons from "../../data/Icons.json";
import { useRecoilState } from "recoil";
import { coursesReload, coursesDelete } from "../../state/triggers";

export default function FolderControls({ data }) {
  const [reload, setReload] = useRecoilState(coursesReload);
  const [remove, toggleRemove] = useRecoilState(coursesDelete);

  useEffect(() => {
    toggleRemove(false);
  }, []);
  async function add() {
    toggleRemove(false);
    await addCourse(data.id, data.name);
    setReload(!reload);
  }

  return (
    <div className="controls">
      <h3>Courses</h3>
      <div>
        <i onClick={add} className={Icons.add} />
        <i onClick={() => toggleRemove(!remove)} className={Icons.remove} />
      </div>
    </div>
  );
}
