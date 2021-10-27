import { useEffect, useState } from "react";
import useStorage from "../../hooks/useStorage";
import { createDocument } from "../../scripts/fireStore";

export default function UploadFile({ id }) {
  const [selected, setSelected] = useState(null);
  const [file, setFile] = useState(null);

  const { url, progress } = useStorage(file);

  function changeHandler(e) {
    let selected = e.target.files[0];
    if (selected) {
      setSelected(selected);
    } else {
      setSelected(null);
    }
  }

  useEffect(() => {
    if (url) {
      createDocument(`/courses/${id}/files`, {
        url: url,
        type: selected.type,
        name: selected.name.substring(0, selected.name.lastIndexOf(".")),
      });
    }
  }, [url]);

  function onSubmit(e) {
    e.preventDefault();
    if (selected) {
      setFile(selected);
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <input type="file" onChange={changeHandler} />
      {progress}
      <button type="submit">Upload</button>
    </form>
  );
}
