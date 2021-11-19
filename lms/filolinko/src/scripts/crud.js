import { createDocument } from "./fireStore";
import { removeDocument } from "./fireStore";
import { removeFile } from "./storage";

export async function addCourse(id, name) {
  await createDocument("courses", {
    name: "Untitled course",
    by: name,
    owner: id,
  });
}

export async function removeCourse(collection, id) {
  collection.forEach(async (element) => {
    await removeDocument(`/courses/${id}/files`, element.id);
    await removeFile(element.ref);
  });
  await removeDocument("courses", id);
}
