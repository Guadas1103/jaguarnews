import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage"

export const environment = {
    firebase: {
        projectId:"jaguarnews-b42e3",
        appId:"1:125883732306:web:cb06f0fb06e1ba680b6a8b",
        storageBucket :"jaguarnews-b42e3.appspot.com",
        apiKey :"AIzaSyAFYwFgeW7sjCwiR9tauLjbv7CAoJ2ELLM",
        authDomain :"jaguarnews-b42e3.firebaseapp.com",
        messagingSenderId :"125883732306"},
        position: "nam5 (us-central)"
        
};

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFYwFgeW7sjCwiR9tauLjbv7CAoJ2ELLM",
    authDomain: "jaguarnews-b42e3.firebaseapp.com",
    projectId: "jaguarnews-b42e3",
    storageBucket: "jaguarnews-b42e3.appspot.com",
    messagingSenderId: "125883732306",
    appId: "1:125883732306:web:cb06f0fb06e1ba680b6a8b"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const storage= getStorage(app);
  export const provider = new GoogleAuthProvider(); 