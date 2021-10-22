import {
  collection,
  doc,
  getDocs,
  query,
  where,
} from "@firebase/firestore/lite";
import { addDoc, setDoc, updateDoc, getDoc } from "@firebase/firestore/lite";

import { fireStoreInstance } from "./firebase";

export async function createDocumentWithId(path, id, data) {
  const documentReference = doc(fireStoreInstance, path, id);
  await setDoc(documentReference, data);
  return id;
}

export async function createDocument(path, data) {
  const collectionReference = collection(fireStoreInstance, path);
  const documentReference = await addDoc(collectionReference, data);

  return documentReference.id;
}

export async function updateDocument(path, data) {
  const documentReference = doc(fireStoreInstance, path, data.id);
  await updateDoc(documentReference, data);
}

export async function getCollection(path) {
  const collectionReference = collection(fireStoreInstance, path);
  const q = query(collectionReference, where("role", "==", "student"));
  const snapshot = await getDocs(q);
  const list = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return list;
}

export async function getDocument(path, id) {
  const documentReference = doc(fireStoreInstance, path, id);
  const document = await getDoc(documentReference);
  return { id: document.id, ...document.data() };
}
