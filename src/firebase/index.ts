import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA9z-ps9g1gftWuWRyfO9SKXnAV0T7m48E",
  authDomain: "transfer-safe.firebaseapp.com",
  projectId: "transfer-safe",
  storageBucket: "transfer-safe.appspot.com",
  messagingSenderId: "455095538307",
  appId: "1:455095538307:web:19cb660453c066e05b01b6"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);