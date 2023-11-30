import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 email: string ='';
 password: string = '';

 constructor(private authService: AuthService, private router: Router) { }

 ngOnInit(): void {}

  async onSubmit() {
    try {
      const result = await this.authService.login(this.email, this.password);
      console.log('Inicio de sesión exitoso:', result);
      this.router.navigate(['home']);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }



  async loginWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
    } catch (error) {
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

