// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA0nN0XmR4kATJrE1YLnbZ7h7TjnAD6ZE",
  authDomain: "fir-a669c.firebaseapp.com",
  projectId: "fir-a669c",
  storageBucket: "fir-a669c.appspot.com",
  messagingSenderId: "284649782920",
  appId: "1:284649782920:web:bbaae28cad068792aee93d",
  measurementId: "G-D8LRWNK1EM"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);