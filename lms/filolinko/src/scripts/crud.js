import { createDocument } from "./fireStore";
import { removeDocument } from "./fireStore";
import { removeFile } from "./storage";

export async function addCourse(id) {
  await createDocument("courses", {
    name: "Untitled course",
    owner: id.id,
  });
}

export async function removeCourse(collection, id) {
  collection.forEach(async (element) => {
    await removeDocument(`/courses/${id}/files`, element.id);
    await removeFile(element.ref);
  });
  await removeDocument("courses", id);
}
