import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { dbUrl } from '../constant';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCOahx1HD1Ns2_Z2verICVrzBarVj0P-Gc",
  authDomain: "blog-22bf7.firebaseapp.com",
  databaseURL: dbUrl,
  projectId: "blog-22bf7",
  storageBucket: "blog-22bf7.appspot.com",
  messagingSenderId: "389016441869",
  appId: "1:389016441869:web:b8f2af9c1a6d88beaf3144"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

export function register(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function logout() {
  signOut(auth).then(() => {
    console.log("signed out");
  }).catch((error) => {
    console.log(error);
  });
}