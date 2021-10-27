import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export default async function uploadImage(file) {
  const myRef = ref(storage, `${file.name}_${Date.now()}`);
  await uploadBytes(myRef, file).then((snapshot) => {
    console.log();
  });
  return getDownloadURL(myRef);
}
