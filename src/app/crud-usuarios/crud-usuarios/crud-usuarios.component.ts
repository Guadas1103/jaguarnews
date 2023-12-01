import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/servicios/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { Router } from '@angular/router';

@Component({
 selector: 'app-crud-usuarios',
 templateUrl: './crud-usuarios.component.html',
 styleUrls: ['./crud-usuarios.component.css']
})
export class CrudUsuariosComponent implements OnInit {

 users: any[] = []; // Declarar la variable users

 constructor(private userService: UserService, private dialog: MatDialog, private router: Router) { } // Inyecta MatDialog aquí

 ngOnInit() {
   this.getUsers();
 }

 getUsers() {
   this.userService.getUsers().subscribe(data => {
     this.users = data.map(e => {
       const user = {
         id: e.payload.doc.id,
         ...e.payload.doc.data() as object
       };
       console.log(user); // Imprime el objeto user en la consola
       return user;
     });
   });
 }

 updateUser(user: any) {
   const dialogRef = this.dialog.open(EditUserModalComponent, {
     data: user
   });
  
   dialogRef.afterClosed().subscribe(result => {
     if (result) {
       this.userService.updateUser(result);
     }
   }); 
 }

 deleteUser(user: any) {
   this.userService.deleteUser(user);
 }
 navigateToHome() {
  this.router.navigate(['/home-admin']);
}
navigateToUsuario() {
  this.router.navigate(['/admin-usuarios']);
}
navigateToEditar() {
  this.router.navigate(['/editar-noticia-admin']);
}
}

