import { initializeApp } from "firebase/app";
import { dbUrl } from '../constant';
import { getDatabase, ref, child, get } from "firebase/database";

const firebaseConfig = {
  databaseURL: dbUrl
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();

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
