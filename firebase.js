import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-ijSTmGKKxLvJmFNjdeZsPAaXXj3K6tQ",
  authDomain: "whatsapp-bc767.firebaseapp.com",
  projectId: "whatsapp-bc767",
  storageBucket: "whatsapp-bc767.appspot.com",
  messagingSenderId: "246809012285",
  appId: "1:246809012285:web:f57f6e3f2bdeaa58d2e254",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, { experimentalForceLongPolling });
