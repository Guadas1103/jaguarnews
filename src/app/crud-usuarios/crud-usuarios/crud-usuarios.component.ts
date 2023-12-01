import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/servicios/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { AuthService } from 'src/app/servicios/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
 selector: 'app-crud-usuarios',
 templateUrl: './crud-usuarios.component.html',
 styleUrls: ['./crud-usuarios.component.css']
})
export class CrudUsuariosComponent implements OnInit {

 users: any[] = []; // Declarar la variable users
 modalRef!: BsModalRef;

 constructor(
   private userService: UserService,
   private dialog: MatDialog,
   private afAuth: AngularFireAuth,
   private modalService: BsModalService,
   private authService: AuthService,
   private router: Router,
   private toastr: ToastrService // Inyecta ToastrService en el constructor
 ) {}

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
     });
   });
 }

 // crudusuarios crear nuevo usuario
 openModal() {
   this.modalRef = this.modalService.show(RegisterModalComponent);
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
   this.afAuth.currentUser.then(currentUser => {
     if (currentUser) {
       currentUser.delete().then(() => {
         this.toastr.success('Usuario eliminado de Firebase Authentication');
         this.userService.deleteUser(user);
       }).catch(error => {
         this.toastr.error('Error al eliminar el usuario de Firebase Authentication', error.message);
       });
     } else {
       this.toastr.error('El usuario no está autenticado');
     }
   });
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

