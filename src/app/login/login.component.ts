import { Component,  Inject} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiRestService } from '../api-rest.service';


/*import { AngularFirestore } from '@angular/fire/firestore';*/


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
    private msg: ToastrService
  
    
    /*private firestore: AngularFirestore*/){}
  login(){
    this.showLoading = true;

  this.api.login(this.email, this.pass).subscribe({
    next: respuestas => {
      this.msg.warning("Bienvenido a JaguarNews");
      localStorage.setItem("correo", this.email);

      // Verificar el correo electrónico y redirigir según la condición
      if (this.email === 'lupdom19@gmail.com') {
        this.router.navigate(['/home-admin']);
      } else {
        this.router.navigate(['/home']);
      }
    },
    error: problemilla => {
      this.msg.error("Error en el usuario o contraseña");
      this.showError = true;
    },
    complete: () => {
      // Restablecer showLoading a false después de que se completa la operación
      this.showLoading = false;
    }
    });
      
  }

}