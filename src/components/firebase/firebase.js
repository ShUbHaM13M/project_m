import { initializeApp } from "firebase/app";
import {
  disableNetwork,
  enableIndexedDbPersistence,
  enableMultiTabIndexedDbPersistence,
  getFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const config = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
};

const app = initializeApp(config);

export const db = getFirestore();
export const auth = getAuth();

enableIndexedDbPersistence(db);

export default app;
