import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/servicios/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
 selector: 'app-crud-usuarios',
 templateUrl: './crud-usuarios.component.html',
 styleUrls: ['./crud-usuarios.component.css']
})
export class CrudUsuariosComponent implements OnInit {

 users: any[] = []; // Declarar la variable users
//  public event: EventEmitter<any> = new EventEmitter();
modalRef!: BsModalRef;

 constructor(private userService: UserService, private dialog: MatDialog, private afAuth: AngularFireAuth,
   private modalService: BsModalService, private authService: AuthService, private router: Router) { } 

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
   this.userService.deleteUser(user);
   // Asegúrate de que el usuario esté autenticado antes de eliminarlo
   this.afAuth.currentUser.then(currentUser => {
     if (currentUser) {
       currentUser.delete().then(() => {
         console.log('Usuario eliminado de Firebase Authentication');
       }).catch(error => {
         console.error('Error al eliminar el usuario de Firebase Authentication', error);
       });
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

