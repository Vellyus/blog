import { initializeApp } from "firebase/app";
import { dbUrl } from '../constant';
import { getDatabase, ref, child, get } from "firebase/database";

const firebaseConfig = {
  databaseURL: dbUrl
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();