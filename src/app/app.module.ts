import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CrearUsuarioAdminComponent } from './crear-usuario-admin/crear-usuario-admin.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFontAwesomeComponent } from 'angular-font-awesome';
import { AuthGuard } from './guards/auth.guards';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from './environment';

@NgModule({
 declarations: [
   AppComponent,
   LoginComponent,
   HomeComponent,
   RegisterComponent,
   SistemaComponent,
   IndustrialComponent,
   HomeAdminComponent,
   CrearUsuarioAdminComponent
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
   provideFirebaseApp(() => initializeApp(environment.firebase)),
   provideAuth(() => getAuth()),


 ],
 providers: [],
 bootstrap: [AppComponent]
})
export class AppModule { }