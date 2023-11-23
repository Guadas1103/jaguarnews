import { Component } from '@angular/core';
import { ApiRestService } from '../../api-rest.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css']
})
export class SistemaComponent {
  constructor(private api: ApiRestService, private router: Router) {}
  ngOnInit():void {}

  navigateToHome() {
  this.router.navigate(['/home']);
  }
}




