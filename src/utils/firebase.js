// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDI87NKYNSmX7FKE2ukK-sFGKERF_Cpwk",
  authDomain: "movieapp-gpt.firebaseapp.com",
  projectId: "movieapp-gpt",
  storageBucket: "movieapp-gpt.appspot.com",
  messagingSenderId: "642646718965",
  appId: "1:642646718965:web:ba851b6c7cfa4b4f2fc8bc",
  measurementId: "G-6MY3LP3ENK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()