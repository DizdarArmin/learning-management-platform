import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { filesDelete, filesReload } from "../../state/triggers";
import { FileType } from "../../scripts/fileType";
import { removeDocument } from "../../scripts/fireStore";
import { removeFile } from "../../scripts/storage";
import Icons from "../../data/Icons.json";

export default function File({ hook }) {
  const [reload, setReload] = useRecoilState(filesReload);
  const [remove, toggleRemove] = useRecoilState(filesDelete);
  const [wiggle, setWiggle] = useState("");

  useEffect(() => {
    if (remove) {
      setWiggle("wiggle-active");
    } else {
      setWiggle("");
    }
  }, [remove]);
  const [item, id] = hook;

  async function removeItem() {
    await removeFile(item.ref);
    await removeDocument(`/courses/${id}/files`, item.id);
    setReload(!reload);
  }

  return (
    <div className={`file ${wiggle}`}>
      <span>
        {remove && (
          <i onClick={(e) => removeItem(e)} className={Icons.removeSmall} />
        )}
      </span>
      <i className={FileType(item.type)} />
      <p>{item.ref}</p>
      <a href={item.url} download>
        Download
      </a>
    </div>
  );
}
