import { getDatabase, ref, child, get, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../constant";

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(getDatabase());

export function getData() {
  return get(child(dbRef, "/")).then((snapshot) => {
    if (snapshot.exists()) {
      // console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

export function addOrEditBlogPost(id, image, title, lead, body) {
  const reference = ref(db, id);
  return set(reference, {
    image: image,
    title: title,
    lead: lead,
    body: body
  });
}

export function removeBlogPost(id) {
  const reference = ref(db, id);
  set(reference, null);
}
