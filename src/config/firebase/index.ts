// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwtiYIxKjSk3TJKYxYJumBfBNoAZWuL5o",
  authDomain: "edu-quest-c471f.firebaseapp.com",
  projectId: "edu-quest-c471f",
  storageBucket: "edu-quest-c471f.appspot.com",
  messagingSenderId: "686703187679",
  appId: "1:686703187679:web:c3b1491b135a44c7163b6a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
