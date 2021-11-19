import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { createDocumentWithId, updateDocument } from "../../scripts/fireStore";
import { useRecoilState } from "recoil";
import { filesReload } from "../../state/triggers";
import useDocument from "../../hooks/useDocument";
import Edit from "../../data/Edit.json";
import useStorage from "../../hooks/useStorage";
import Input from "./Input";
import Progress from "./Progress";
import SelectFile from "./SelectFile";
import { removeFile } from "../../scripts/storage";

export default function UploadFile({ modal, setShowModal, itemID }) {
  const [isCancel, setIsCancel] = useState(false);
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const { id } = useParams();
  const [reload, setReload] = useRecoilState(filesReload);
  const { url, progress, ref } = useStorage(file);
  const { document } = useDocument(`/courses/${id}/files`, itemID, null);

  useEffect(async () => {
    if (isCancel) {
      if (!itemID) {
        await removeFile(ref);
      }
    }
  }, [isCancel]);

  useEffect(() => {
    if (document) {
      setName(document.name);
    }
  }, [document]);

  async function makeEntry(name, url, ref, type) {
    let data = { name: name, url: url, ref: ref, type: type };
    if (itemID) {
      await updateDocument(`/courses/${id}/files`, itemID, data);
    } else {
      data = { ...data, id: Date.now().toString() };
      await createDocumentWithId(`/courses/${id}/files`, data.id, data);
    }
  }

  async function onCancel() {
    setShowModal(false);
    setIsCancel(true);
  }
  useEffect(() => {
    if (name) {
      if (name.length < 3) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }
  }, [name]);

  useEffect(() => {
    if (!file && !link) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [file, link]);

  async function addEntry(e) {
    e.preventDefault();
    if (url && name.length > 2) {
      await makeEntry(name, url, file.name, file.type);
      setLink(null);
    } else if (link && name.length > 2) {
      setIsCancel(true);
      await makeEntry(name, link, link, "link");
      setFile(null);
    }
    setReload(!reload);
    setShowModal(false);
  }

  return (
    <form className="upload" onSubmit={addEntry}>
      <Progress progress={progress} url={url} file={file} />
      <Input hook={[name, setName, Edit.name]} />
      <SelectFile setFile={setFile} progress={progress} />
      <Input hook={[link, setLink, Edit.link]} />

      <div className="buttons">
        <button type="submit" disabled={isDisabled} className="button-submit">
          Submit
        </button>

        <button onClick={onCancel} className="button-cancel">
          Cancel
        </button>
      </div>
    </form>
  );
}
