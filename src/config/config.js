import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAT89DHtm4dWR5nHydj4uFNxoit0Qtu3hQ",
  authDomain: "todoappreactfirebase-76f5a.firebaseapp.com",
  projectId: "todoappreactfirebase-76f5a",
  storageBucket: "todoappreactfirebase-76f5a.appspot.com",
  messagingSenderId: "1043880173499",
  appId: "1:1043880173499:web:655112f0880a2c062d6e9e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {auth, db}

