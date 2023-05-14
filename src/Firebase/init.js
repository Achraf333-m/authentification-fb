// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0-YZN_4q96Jx25JM_b0goCsnePL4B9M8",
  authDomain: "fir-practice-88acf.firebaseapp.com",
  projectId: "fir-practice-88acf",
  storageBucket: "fir-practice-88acf.appspot.com",
  messagingSenderId: "701590539558",
  appId: "1:701590539558:web:4739130ed08db3ff5a85e7",
  measurementId: "G-9VVX02SF5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
const analytics = getAnalytics(app);