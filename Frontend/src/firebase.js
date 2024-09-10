// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realstate-d8dcd.firebaseapp.com",
  projectId: "realstate-d8dcd",
  storageBucket: "realstate-d8dcd.appspot.com",
  messagingSenderId: "300766283328",
  appId: "1:300766283328:web:eebe08cfa6d4d48b4981a5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);