import { getDatabase, ref, child, get } from "firebase/database";

export function getData() {
  const dbRef = ref(getDatabase());
  get(child(dbRef, "/")).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}
