import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../api-rest.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(
    private api: ApiRestService,
    private router: Router,
    private firestore: AngularFirestore  // Agrega esta línea
  ) {}

  ngOnInit(): void {
    // Puedes usar this.firestore aquí si es necesario
  }

  navigateToHome() {
    this.router.navigate(['/home-admin']);
  }

  navigateToUsuario() {
    this.router.navigate(['/crear-usuario-admin']);
  }

  navigateToEditar() {
    this.router.navigate(['/editar-noticia-admin']);
  }
}