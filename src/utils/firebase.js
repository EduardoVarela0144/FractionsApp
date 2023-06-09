import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRmv86COfNLq_J05IVS50bZYiBqjwI8Aw",
  authDomain: "fractionsapp.firebaseapp.com",
  projectId: "fractionsapp",
  storageBucket: "fractionsapp.appspot.com",
  messagingSenderId: "757950850930",
  appId: "1:757950850930:web:3cec9699d6af9c51e6dfeb",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
