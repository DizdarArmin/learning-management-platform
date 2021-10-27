import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createDocumentWithId } from "../../scripts/fireStore";
import { useRecoilState } from "recoil";
import { filesReload } from "../../state/triggers";
import Icons from "../../data/Icons.json";

export default function UploadFile({ hook }) {
  const [url, file, setFile, modal, setShowModal] = hook;
  const [link, setLink] = useState(null);
  const [name, setName] = useState("");
  const { id } = useParams();
  const [reload, setReload] = useRecoilState(filesReload);

  function buildFileSelector() {
    const fileSelector = document.createElement("input");
    fileSelector.setAttribute("type", "file");
    fileSelector.onchange = (e) => changeHandler(e);
    return fileSelector;
  }
  const fileSelector = buildFileSelector();

  useEffect(() => {
    if (url) {
      const data = {
        url: url,
        type: file.type,
        ref: file.name,
        id: Date.now().toString(),
      };
      Add(data);
    }
  }, [url]);

  function Add(data) {
    createDocumentWithId(`/courses/${id}/files`, data.id, data);
    setFile(null);
    setLink(null);
    setReload(!reload);
    setShowModal(!false);
  }

  function changeHandler(e) {
    let selected = e.target.files[0];
    if (selected) {
      setFile(selected);
    } else {
      setFile(null);
    }
  }

  return (
    <div className="upload">
      <h3>Upload file</h3>
      <i onClick={() => fileSelector.click()} className={Icons.upload} />
      <h3>- or -</h3>
      <h3>Paste link</h3>
      <input
        type="text"
        placeholder="https://www.pluralsight.com/paths/javascript-core-language"
      />
    </div>
  );
}
