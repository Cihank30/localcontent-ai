// src/lib/gemini.js
import { initializeApp } from "firebase/app";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai";

const firebaseConfig = {
  apiKey: "AIzaSyADw32hR8jxkxQZI_Z3uzg5z9_u6crcXNM",
  authDomain: "localcontent-ai.firebaseapp.com",
  projectId: "localcontent-ai",
  storageBucket: "localcontent-ai.appspot.com",
  messagingSenderId: "149626522331",
  appId: "1:149626522331:web:b7115614fb21e637afdafe",
};

const app = initializeApp(firebaseConfig);
const vertexAI = getVertexAI(app);

// Modèle Gemini 2 (texte rapide et pas cher)
export const model = getGenerativeModel(vertexAI, { model: "gemini-2.0-flash" });
