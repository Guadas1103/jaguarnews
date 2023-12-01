import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';  // Agrega esta línea
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  email: string = '';
  password: string = '';
  name: string = '';
  lastName: string = '';
  mLastName: string = '';
  constructor(private fb: FormBuilder,  private authService: AuthService, private router: Router) {
    
      this.registerForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        mLastName: ['', Validators.required],
      });
    
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      mLastName: ['', Validators.required],
      rol: ['estudiante']
    });
  }


  async onSubmit() {
    if (this.registerForm.valid) {
      try {
        const result = await this.authService.register(
          this.registerForm.value.email,
          this.registerForm.value.password,
          this.registerForm.value.name,
          this.registerForm.value.lastName,
          this.registerForm.value.mLastName,
          'estudiante'
        );
        console.log('Registro exitoso:', result);
        this.router.navigate(['login']);
        // Mostrar una alerta de éxito aquí si lo deseas
      } catch (error) {
        console.error('Error al registrar:', error);
        // Mostrar una alerta de error aquí si lo deseas
      }
    } else {
      console.error('Formulario inválido');
      // Mostrar una alerta de formulario inválido aquí si lo deseas
    }
  }
 
}


