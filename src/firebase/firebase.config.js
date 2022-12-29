// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ9_a39UDgL3Lm_OmwT4zTi1D1MXdfsWQ",
  authDomain: "todoapp-470f9.firebaseapp.com",
  projectId: "todoapp-470f9",
  storageBucket: "todoapp-470f9.appspot.com",
  messagingSenderId: "118109421132",
  appId: "1:118109421132:web:ef630e2e77093c3b14fee9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;