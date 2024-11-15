import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "fir-frontend-f8ea7.firebaseapp.com",
  projectId: "fir-frontend-f8ea7",
  storageBucket: "fir-frontend-f8ea7.appspot.com",
  messagingSenderId: "26165509948",
  appId: "1:26165509948:web:b78b63bdb9eab6af056839",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
