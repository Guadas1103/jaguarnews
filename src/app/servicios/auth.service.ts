import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../environment";
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
   private router: Router;
   private loggedIn = false;
  
   constructor(router: Router) {
     this.router = router;
     onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  isLoggedIn() {
    return this.loggedIn;
  }
  
  async registrar(formValue: any) {
    if (this.registroForm.valid) {
      const userCredential = await signInWithEmailAndPassword(auth, formValue.email, formValue.password);
      const user = userCredential.user;
      if(user && user.email){
        let name, lastName, mlastName;
        if(user.displayName) {
          const displayNameParts = user.displayName.split(' ');
          name = displayNameParts[0];
          lastName = displayNameParts[1];
          mlastName = displayNameParts[2];
        }
        await setDoc(doc(db, 'users', user.email), {
          email: user.email,
          numControl: user.email.substring(0, 8),
          lastName: lastName,
          mlastName: mlastName,
          name: name,
          // Aquí puedes agregar más campos si lo deseas
        });
      } else{
        console.error('Error: el usuario no tiene un correo electrónico');
      }
    }
  }

   async loginWithGoogle() {
     try {
       const provider = new GoogleAuthProvider();
       const userCredential = await signInWithPopup(auth, provider);
       const user = userCredential.user;
       if(user && user.email){
         let name, lastName, mlastName;
         if(user.displayName) {
           const displayNameParts = user.displayName.split(' ');
           name = displayNameParts[0];
           lastName = displayNameParts[1];
           mlastName = displayNameParts[2]
         }
         await setDoc(doc(db, 'users', user.email), {
           email: user.email,
           numControl: user.email.substring(0, 9),
           lastName: lastName,
           name: name,
         });
       } else{
         console.error('Error: el usuario no tiene un correo electrónico');
       }
     } catch (error) {
       console.error('Error en el inicio de sesión:', error);
     }
   }

   async logout() {
     try {
       await signOut(auth);
       // Redirige al usuario a la ruta 'login'
       this.router.navigate(['login']);
     } catch (error) {
       console.error('Error al cerrar la sesión:', error);
     }
   }
}

