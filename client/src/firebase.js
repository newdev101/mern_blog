// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e86b6.firebaseapp.com",
  projectId: "mern-blog-e86b6",
  storageBucket: "mern-blog-e86b6.appspot.com",
  messagingSenderId: "1017376664200",
  appId: "1:1017376664200:web:59db0336dbdff0e59fcd3d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);