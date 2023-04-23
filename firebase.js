// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCOFFP7KD32Clsl9KCflMlJw0X6aade1y8",
  authDomain: "filehostingvrn.firebaseapp.com",
  projectId: "filehostingvrn",
  storageBucket: "filehostingvrn.appspot.com",
  messagingSenderId: "96044894531",
  appId: "1:96044894531:web:64c61058c18e94ceff47f6",
  measurementId: "G-1SZE3Z8Y87",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const storage = firebase.storage();

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
