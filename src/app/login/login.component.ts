import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.css']
})
export class LoginComponent {
 email: string ='';
 password: string = '';

 constructor(private authService: AuthService, private router: Router) { }

 async login(email: string, password: string) {
  try {
    await this.authService.loginWithEmail(email, password);
    // Redirige al usuario a la ruta 'home' después de iniciar sesión
    this.router.navigate(['home']);
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
 }

 async loginWithGoogle() {
 try{
   await this.authService.loginWithGoogle();
   // Redirige al usuario a la ruta 'home' después de iniciar sesión con Google
   this.router.navigate(['home']);
 }catch (error) {
   console.error('Error al iniciar sesión con Google', error);
 }
 }

 async logout() {
  try {
    await this.authService.logout();
    // Redirige al usuario a la ruta 'login' después de cerrar sesión
    this.router.navigate(['login']);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
 }
}

