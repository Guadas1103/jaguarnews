import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../environment';
import { Router } from '@angular/router';

@Component({
 selector: 'app-home',
 templateUrl: './home.component.html',
 styleUrls: ['./home.component.css']
})
export class HomeComponent {
 constructor(private authService: AuthService, private router: Router) {
   onAuthStateChanged(auth, (user) => {
     if(user == null){
         this.router.navigate(['login'])
     }
   });
 }

 logOut(){
   this.authService.logout();
 }
}

