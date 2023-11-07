import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiRestService } from '../api-rest.service';
import { ToastrService } from 'ngx-toastr';
/*import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';*/


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string = ""
  pass = ""
  showError = false
  showLoading = false
  constructor(
    private router: Router, 
    private api: ApiRestService, 
    private msg: ToastrService,
    /*private afAuth: AngularFireAuth,
    private firestore: AngularFirestore*/){}
  login(){
    this.showLoading = true
    this.api.login(this.email, this.pass).subscribe({
      next: respuestas => {
        this.msg.warning("Bienvenido a JaguarNews")
        localStorage.setItem("correo", this.email)
/*
        const user = await this.afAuth.currentUser;
    
        if (user) {
          // Vincula datos a la base de datos
          const datos = {
            nombre: 'Ejemplo', // Puedes reemplazar esto con los datos del usuario
            email: this.email,
            // Otras propiedades de datos que desees vincular
          };
          await this.vincularCuentaConDatos(user.uid, datos);
        } else {
          console.log('Usuario no autenticado.');
        }*/

        this.router.navigate(['/home']);
      },
      error: problemilla => {
        this.msg.error("Error en el usuario o contraseña")
      
        this.showError = true
        this.showLoading = false
      }
    })
      
  }
}