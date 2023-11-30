import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';  // Agrega esta línea
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder,  private authService: AuthService) {
   
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      mLastName: ['', Validators.required]
    });
  }

  async onSubmit() {
    const { email, password, name, lastName, mLastName } = this.registerForm.value;
    await this.authService.register(email, password, name, lastName, mLastName);
    this.registerForm.reset();
  }
 
}


