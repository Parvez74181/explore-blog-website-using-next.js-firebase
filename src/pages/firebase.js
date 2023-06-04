import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCNS4J-sgBRhMyVAKt41S8mvCEJ6VHbNIQ",
  authDomain: "blog-website-5004d.firebaseapp.com",
  projectId: "blog-website-5004d",
  storageBucket: "blog-website-5004d.appspot.com",
  messagingSenderId: "681447674849",
  appId: "1:681447674849:web:0ca3e3ba7c7660ff45f8a0",
  measurementId: "G-PS8RP4QDVM",
};

const app = initializeApp(firebaseConfig); // Initialize Firebase

export const db = getFirestore(app); // Initialize Cloud Firestore and get a reference to the service
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); // Initialize GoogleAuthProvider

// const analytics = getAnalytics(app);
