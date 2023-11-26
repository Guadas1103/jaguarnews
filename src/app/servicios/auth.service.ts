import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { GoogleAuthProvider } from "firebase/auth";
import { AngularFireAuth} from '@angular/fire/compat/auth';




@Injectable({
    providedIn: 'root'
})

export class AuthService {
    userData: any;

    constructor(
        private afAuth: AngularFireAuth,
        private firebaseAuthenticationService: AngularFireAuth,
        private router: Router,
        private ngZone : NgZone
    ){
        this.firebaseAuthenticationService.authState.subscribe((user) => {
            if (user){
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));

            } else {
                localStorage.setItem('user', 'null');
            }
        })
    }

    //Login con email y password
    logWhitEmailAndPassword(email: string, password: string){
        return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
       .then((userCredential) => {
        this.userData = userCredential.user
        this.observeUserState()
       }) 
       .catch((error: Error) => {
        alert(error.message);
       })
    }

    //Login con Google
    logWhitGoogleProvider (){
        return this.firebaseAuthenticationService.signInWithPopup(new GoogleAuthProvider())
        .then(() => this.observeUserState())
        .catch((error: Error) => {
        alert(error.message);
        })
    }

    observeUserState (){
        this.firebaseAuthenticationService.authState.subscribe((userState) => {
            userState && this.ngZone.run(() => this.router.navigate(['home']))
        })
    }

    //regresar cuando el usuario esta logged in
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user')!);
        return user !== null;
    }

    // logOut
    logOut(){
        return this.firebaseAuthenticationService.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['login']);
        })
    }

}