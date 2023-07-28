import { getStorage, ref } from "firebase/storage";
import { initializeApp } from "firebase/app";


export const dbUrl = "https://blog-22bf7-default-rtdb.europe-west1.firebasedatabase.app/";

export const firebaseConfig = {
  apiKey: "AIzaSyCOahx1HD1Ns2_Z2verICVrzBarVj0P-Gc",
  authDomain: "blog-22bf7.firebaseapp.com",
  databaseURL: dbUrl,
  projectId: "blog-22bf7",
  storageBucket: "blog-22bf7.appspot.com",
  messagingSenderId: "389016441869",
  appId: "1:389016441869:web:b8f2af9c1a6d88beaf3144",
  storageBucket: "gs://blog-22bf7.appspot.com/"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const storageRef = ref(storage);
