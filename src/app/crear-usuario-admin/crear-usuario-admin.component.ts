import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRestService } from '../api-rest.service';

@Component({
  selector: 'app-crear-usuario-admin',
  templateUrl: './crear-usuario-admin.component.html',
  styleUrls: ['./crear-usuario-admin.component.css']
})
export class CrearUsuarioAdminComponent {
  constructor(private api: ApiRestService, private router: Router) {}
  nuevoUsuario = {
    nombre: '',
    correo: '',
    rol: 'usuario',
  };
  crearUsuario() {
    // Aquí deberías llamar a tu servicio para crear el nuevo usuario
    // Puedes utilizar un servicio que haga la solicitud HTTP al backend, por ejemplo.
    console.log('Nuevo usuario:', this.nuevoUsuario);
    // Limpia el formulario después de crear el usuario si es necesario
    this.nuevoUsuario = { nombre: '', correo: '', rol: 'usuario' };
  }

  navigateToHome() {
    this.router.navigate(['/home-admin']);
  }
  navigateToUsuario() {
    this.router.navigate(['/crear-usuario-admin']);
  }

  


}
