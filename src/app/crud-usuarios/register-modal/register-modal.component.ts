import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit{
  registerForm!: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder){}

  
 ngOnInit(): void {
  this.registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    mLastName: ['', Validators.required]
  });
}

  onSubmit() {
    const { email, password, name, lastName, mlastName, rol } = this.registerForm.value;
    this.authService.register(email, password, name, lastName, mlastName, rol);
    this.registerForm.reset();
   }
}
