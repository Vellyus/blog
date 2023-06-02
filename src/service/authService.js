import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../constant";
import { getDatabase } from "firebase/database";

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