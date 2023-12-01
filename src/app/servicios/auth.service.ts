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

interface UserDocumentData {
  rol?: string;
  // Agrega aquí otros campos si los tienes en tus documentos
}
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

  // AuthService crear nuevo usuario en crud-usuarios
async createUser(email: string, password: string, name: string, lastName: string, mlastName: string, rol:string) {
  return await this.register(email, password, name, lastName, mlastName, rol);
}

  
  async register(
  email: string,
  password: string,
  name: string,
  lastName: string,
  mLastName: string,
  rol: string
) {
  // Validar el correo electrónico
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
      rol
    };
    await this.firestore.collection('users').doc(email).set(userData);
    console.log('Usuario registrado con éxito.');
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    throw error; // Asegúrate de propagar el error para que pueda ser manejado en el componente
  }
}

async login(email: string, password: string): Promise<void> {
  try {
    // Autenticar con correo y contraseña de Google
    const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    if (user) {
      // Verificar el rol del usuario en Firestore
      const userDocRef = this.firestore.collection('users').doc(user.uid);
      const userDoc = await userDocRef.get().toPromise();

      if (userDoc && userDoc.exists) {
        const userData = userDoc.data() as UserDocumentData;

        if (userData.rol) {
          // Verificar el rol del usuario y redirigir
          if (userData.rol === 'administrador') {
            this.router.navigate(['admin-home']);
          } else if (userData.rol === 'estudiante') {
            this.router.navigate(['home']);
          } else {
            console.error('Error: Rol no reconocido');
          }
        } else {
          console.error('Error: El campo "rol" no existe en el documento del usuario');
        }
      } else {
        console.error('Error: No se encontró el documento del usuario o el documento no existe');
      }
    } else {
      console.error('Error: No se pudo obtener el usuario después de iniciar sesión');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    // Manejar el error según tus necesidades (por ejemplo, mostrar un mensaje al usuario)
  }
}
   

async loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user: User | null = userCredential.user;

    if (user && user.email) {
      // Asigna el rol de "estudiante" por defecto
      let rol = 'estudiante';

      // Verifica si el correo electrónico es igual a 's20030178@itsch.edu.mx'
      if (user.email === 's20030178@itsch.edu.mx') {
        rol = 'administrador';
      }

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

      // Almacena datos en Firestore y asigna el rol correspondiente
      await setDoc(doc(db, 'users', user.email), {
        email: user.email,
        numControl: user.email.substring(0, 9),
        lastName: lastName,
        mlastName: mlastName,
        name: name,
        rol: rol,
      });

      // Redirige al usuario según su rol
      if (rol === 'estudiante') {
        this.router.navigate(['home']);
      } else if (rol === 'administrador') {
        this.router.navigate(['home-admin']);
      }
    } else {
      console.error('Error: el usuario no tiene un correo electrónico');
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
  }
}

  async logout() {
    try {
      // Cierra sesión con Firebase
      await this.auth.signOut();

      // Redirige al usuario a la ruta 'login'
      this.router.navigate(['login']);
    } catch (error) {
      console.error('Error al cerrar la sesión:', error);
    }
  }
}

