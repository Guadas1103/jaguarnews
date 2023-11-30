import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../environment";
import { Router } from '@angular/router';
import { Injectable, OnInit } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private router: Router;
   private loggedIn = false;
  
   constructor(router: Router,  private fb: FormBuilder,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore ) {
     this.router = router;


     this.auth.authState.subscribe(user => {
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
    
  }
  // Obtener token de autenticación//
  getUserDetails(): Observable<any> {
    return this.auth.authState; // authState ya proporciona la información del usuario actual
  }


   
  isLoggedIn() {
    return this.loggedIn;
  }  
  
  async register( email: string, password: string, name: string, lastName: string, mLastName: string) {
    // Validar el correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@itsch\.edu\.mx$/;
    if (!emailRegex.test(email)) {
      console.error('Error: Correo electrónico no válido');
      return;
    }
    try {
      // Registrar usuario en Firebase Authentication
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      // Almacenar datos en Firestore
      const userData = {
        numControl: email.substring(0, 9),
        email,
        name,
        lastName,
        mLastName,
      };
      await this.firestore.collection('users').doc(email).set(userData);
      console.log('Usuario registrado con éxito.');
      
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  }

   async login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Usuario registrado exitosamente
        var user = userCredential.user;
        // Redirigir al usuario a la página de inicio
        this.router.navigate(['home']);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error('Error al iniciar sesión:', errorMessage);
      });
   }
   
   

   async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user: User | null = userCredential.user;
  
      if (user && user.email) {
        let name, lastName, mlastName;
  
        if (user.displayName) {
          const displayNameParts = user.displayName.split(' ');
  
          // El primer apellido es la segunda parte del nombre
          lastName = displayNameParts[1];
  
          // Si hay una tercera parte, es el segundo apellido
          if (displayNameParts.length >= 3) {
            mlastName = displayNameParts[2];
          }
  
          // El primer nombre es la primera parte del nombre
          name = displayNameParts[0];
        }
  
        // Verifica si el correo es igual a 's20030178@itsch.edu.mx'
        if (user.email === 's20030178@itsch.edu.mx') {
          // Redirige al usuario a la ruta 'home-admin'
          this.router.navigate(['home-admin']);
        } else {
          // Redirige al usuario a la ruta 'home'
          this.router.navigate(['home']);
        }
  
        // Almacena datos en Firestore
        await setDoc(doc(db, 'users', user.email), {
          email: user.email,
          numControl: user.email.substring(0, 9),
          lastName: lastName,
          mlastName: mlastName, // Agregamos el segundo apellido
          name: name,
        });
  
      } else {
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

