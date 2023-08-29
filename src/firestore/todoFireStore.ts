import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "todo-app-3cc9b.firebaseapp.com",
  projectId: "todo-app-3cc9b",
  storageBucket: "todo-app-3cc9b.appspot.com",
  messagingSenderId: "523762297741",
  appId: "1:523762297741:web:2ae2004adc497aadf1abc4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const colRef = collection(db, 'todos')
export const auth = getAuth(app)