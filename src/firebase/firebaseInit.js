import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  authDomain: "invoice-vue-app-5b8cb.firebaseapp.com",
  APIKey: "",
  projectId: "invoice-vue-app-5b8cb",
  storageBucket: "invoice-vue-app-5b8cb.appspot.com",
  messagingSenderId: "183675821511",
  appId: "1:183675821511:web:f13b122082114512becde2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
