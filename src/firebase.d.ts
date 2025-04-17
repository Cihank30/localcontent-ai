// filepath: c:\Users\KayaCi2\localcontent-ai\src\lib\firebase.d.ts
declare module "@/lib/firebase" {
  import { FirebaseApp } from "firebase/app";
  import { Auth } from "firebase/auth";
  import { Firestore } from "firebase/firestore";

  export const app: FirebaseApp;
  export const auth: Auth;
  export const db: Firestore;
}