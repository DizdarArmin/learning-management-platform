import { createDocument } from "../../scripts/fireStore";
import { useAuth } from "../../state/AuthContext";
import { useState, useEffect } from "react";
export default function CourseAdd({ hook }) {
  const [owner, remove, toggleRemove, setWiggle, reload, triggerReload] = hook;

  useEffect(() => {
    if (remove) {
      setWiggle("wiggle-active");
    } else {
      setWiggle("");
    }
  }, [remove]);

  async function addCourse() {
    toggleRemove(false);
    await createDocument("courses", {
      name: "Untitled course",
      owner: owner.id,
    });
    triggerReload(!reload);
  }

  return (
    <div className="add-course">
      <i
        onClick={() => toggleRemove(!remove)}
        className="fas fa-2x fa-trash-alt"
      />
      <i onClick={addCourse} className="fas fa-2x fa-plus-circle" />
    </div>
  );
}
