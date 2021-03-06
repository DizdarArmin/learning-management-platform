import ReactDom from "react-dom";

export default function Modal({ children, hook }) {
  const [modal, setShowModal] = hook;

  if (!modal) return null;

  return ReactDom.createPortal(
    <div className="overlay-style" onClick={() => setShowModal(false)}>
      <div className="modal-wrap">
        <i className="modal-close fas fa-times-circle" />
        <div onClick={(e) => e.stopPropagation()} className="modal-style">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
