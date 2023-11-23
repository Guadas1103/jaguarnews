import { Component } from '@angular/core';
import { ApiRestService } from '../api-rest.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  constructor(private api: ApiRestService, private router: Router) {}
  ngOnInit():void {
    
  }
  navigateToHome() {
    this.router.navigate(['/home-admin']);
  }
  navigateToUsuario() {
    this.router.navigate(['/crear-usuario-admin']);
  }
}
