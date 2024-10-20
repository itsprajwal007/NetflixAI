// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTDhoR32hlsyIaOagmsdxn7M-QYm4OF2A",
  authDomain: "netflixai-29851.firebaseapp.com",
  projectId: "netflixai-29851",
  storageBucket: "netflixai-29851.appspot.com",
  messagingSenderId: "557009259678",
  appId: "1:557009259678:web:acdc692bff382a1b0dff8f",
  measurementId: "G-WVRCL4BGRM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
