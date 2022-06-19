import { initializeApp,getApps,getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyD4yo-Jn30ZVR0Y3rc72DkInB1Noh6MGc8",
  authDomain: "facebook-e7035.firebaseapp.com",
  projectId: "facebook-e7035",
  storageBucket: "facebook-e7035.appspot.com",
  messagingSenderId: "558079311101",
  appId: "1:558079311101:web:22b420264d1ee9064f9294"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export {
    app,
    db,
    storage
};
