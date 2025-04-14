// src/lib/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Ta configuration Firebase (celle que tu m'as envoyée)
const firebaseConfig = {
  apiKey: "AIzaSyADw32hR8jxkxQZI_Z3uzg5z9_u6crcXNM",
  authDomain: "localcontent-ai.firebaseapp.com",
  projectId: "localcontent-ai",
  storageBucket: "localcontent-ai.appspot.com", // 🔧 corrige ici ! (pas ".firebasestorage.app")
  messagingSenderId: "149626522331",
  appId: "1:149626522331:web:b7115614fb21e637afdafe",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Exporter l'authentification et la base de données
export const auth = getAuth(app);
export const db = getFirestore(app);
