import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
 selector: 'app-register',
 templateUrl: './register.component.html',
 styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 registroForm: FormGroup;

 constructor(private formBuilder: FormBuilder, private authService: AuthService) { 
  this.registroForm = this.formBuilder.group({
    id: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    lastName: ['', Validators.required],
    mlastName: ['', Validators.required],
    name: ['', Validators.required]
  });
 }

 ngOnInit() {
  
 }

 registrar() {
  if (this.registroForm.valid) {
    this.authService.registrar(this.registroForm);
  }
 }
}
