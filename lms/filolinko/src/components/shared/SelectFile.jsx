import { upload } from "../../data/Icons.json";
export default function SelectFile({ setFile }) {
  function buildFileSelector() {
    const fileSelector = document.createElement("input");
    fileSelector.setAttribute("type", "file");
    fileSelector.onchange = (e) => changeHandler(e);
    return fileSelector;
  }
  const fileSelector = buildFileSelector();
  function changeHandler(e) {
    let selected = e.target.files[0];
    if (selected) {
      setFile(selected);
    } else {
      setFile(null);
    }
  }

  return (
    <>
      <h3>Upload file</h3>
      <i onClick={() => fileSelector.click()} className={upload} />
      <h3>- or -</h3>
      <h3>Paste link</h3>
    </>
  );
}
