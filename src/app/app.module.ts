import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SistemaComponent } from './carreras/sistema/sistema.component';
import { IndustrialComponent } from './carreras/industrial/industrial.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { NoticiasComponent } from './component/noticias/noticias.component';
import { FooterComponent } from './component/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditarNoticiaAdminComponent } from './editar-noticia-admin/editar-noticia-admin.component';
import { CrearUsuarioAdminComponent } from './crear-usuario-admin/crear-usuario-admin.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './environment'
import { AuthService } from './servicios/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';
import { CrudUsuariosComponent } from './crud-usuarios/crud-usuarios/crud-usuarios.component';
import { EditUserModalComponent } from './crud-usuarios/edit-user-modal/edit-user-modal.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog'; // Importa MatDialogModule
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { BioquimicaComponent } from './carreras/bioquimica/bioquimica.component';
import { EmpresarialComponent } from './carreras/empresarial/empresarial.component';
import { MecatronicaComponent } from './carreras/mecatronica/mecatronica.component';
import { NanotecnologiaComponent } from './carreras/nanotecnologia/nanotecnologia.component';
import { TicsComponent } from './carreras/tics/tics.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RegisterModalComponent } from './crud-usuarios/register-modal/register-modal.component';




@NgModule({
 declarations: [
   AppComponent,
   LoginComponent,
   HomeComponent,
   RegisterComponent,
   SistemaComponent,
   IndustrialComponent,
   HomeAdminComponent,
   CrearUsuarioAdminComponent,
   EditarNoticiaAdminComponent,
   NavbarComponent,
   FooterComponent,
   NoticiasComponent,
   CrudUsuariosComponent,
   EditUserModalComponent,
   BioquimicaComponent,
   TicsComponent,
   EmpresarialComponent,
   MecatronicaComponent,
   NanotecnologiaComponent,
   RegisterModalComponent,
  
   
   
 ],
 imports: [
    
   BrowserModule,
   AppRoutingModule,
   HttpClientModule,
   ReactiveFormsModule, 
   FormsModule,
   BrowserAnimationsModule,
   ToastrModule.forRoot(),
   NgbModule,
   AngularFirestoreModule,
   provideFirebaseApp(() => initializeApp(environment.firebase)),
   provideAuth(() => getAuth()),
   provideFirestore(() => getFirestore()),
  RouterModule,
  MatFormFieldModule, 
  MatDialogModule,
  MatInputModule,
  MatGridListModule,
  ModalModule.forRoot(),
  AngularFireModule.initializeApp(environment.firebase),
 ],
 providers: [ AuthService ],
 bootstrap: [AppComponent]
})
export class AppModule { }