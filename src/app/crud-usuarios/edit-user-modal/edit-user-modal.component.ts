import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/servicios/user.service';

@Component({
 selector: 'app-edit-user-modal',
 templateUrl: './edit-user-modal.component.html',
 styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent {
 constructor(
 public dialogRef: MatDialogRef<EditUserModalComponent>,
 @Inject(MAT_DIALOG_DATA) public data: any,
 private userService: UserService
 ) {}

 // En EditUserModalComponent
updateUser() {
  this.userService.updateUser(this.data).then(() => {
    this.dialogRef.close(this.data);
  });
}

}
