import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBV6W-8jBzbfXYxc-ldi0nzqu5dKfaTfno",
  authDomain: "writertoolsweb.firebaseapp.com",
  projectId: "writertoolsweb",
  storageBucket: "writertoolsweb.appspot.com",
  messagingSenderId: "905074683711",
  appId: "1:905074683711:web:6c71c4b35c70a5bbc8ed8a",
  measurementId: "G-HNP2GPB9RT"
};
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)