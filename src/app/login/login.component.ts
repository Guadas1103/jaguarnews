import { Component,  Inject} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiRestService } from '../api-rest.service';
import { AuthService } from '../servicios/auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private authService: AuthService){

}

logIn(email:string, password: string) {
  this.authService.logWhitEmailAndPassword(email, password);
}

logInWithGoogle(){
  this.authService.logWhitGoogleProvider();
}

}