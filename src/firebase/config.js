import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 👈 necesario para Firestore

const firebaseConfig = {
  apiKey: "AIzaSyD4oV0zqVOY8djPcXPofAVHGTlYN4Rk4_o",
  authDomain: "mini-e-commerce-d68bd.firebaseapp.com",
  projectId: "mini-e-commerce-d68bd",
  storageBucket: "mini-e-commerce-d68bd.firebasestorage.app",
  messagingSenderId: "494585555181",
  appId: "1:494585555181:web:5755dea97360621a9bc4e4",
  measurementId: "G-KXSMPS5JBD"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // 👈 inicializas Firestore

export { auth, provider, db }; // 👈 exportas todo lo necesario
