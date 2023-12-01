import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {

  }
  logOut(){
    this.authService.logout();
  }

  navigateToHome() {
    this.router.navigate(['home']);
  }
  navigateToTics() {
    this.router.navigate(['tics']);
  }
  navigateToBioquimica() {
    this.router.navigate(['bioquimica']);
  }
  navigateToEmpresarial() {
    this.router.navigate(['empresarial']);
  }
  navigateToIndustrial() {
    this.router.navigate(['industrial']);
  }
  navigateToMecatronica() {
    this.router.navigate(['mecatronica']);
  }
  navigateToNanotecnologia() {
    this.router.navigate(['nanotecnologia']);
  }
  navigateToSistemas() {
    this.router.navigate(['sistema']);
  }
}
