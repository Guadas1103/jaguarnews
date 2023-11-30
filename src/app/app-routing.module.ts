import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SistemaComponent } from './carreras/sistema/sistema.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { CrearUsuarioAdminComponent } from './crear-usuario-admin/crear-usuario-admin.component';
import { EditarNoticiaAdminComponent } from './editar-noticia-admin/editar-noticia-admin.component';
import { BioquimicaComponent } from './carreras/bioquimica/bioquimica.component';
import { EmpresarialComponent } from './carreras/empresarial/empresarial.component';
import { MecatronicaComponent } from './carreras/mecatronica/mecatronica.component';
import { NanotecnologiaComponent } from './carreras/nanotecnologia/nanotecnologia.component';
import { IndustrialComponent } from './carreras/industrial/industrial.component';
import { TicsComponent } from './carreras/tics/tics.component';
import { AuthGuard } from './guards/auth.guards';


const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path:'signup', component: RegisterComponent},
  {path:'sistema', component: SistemaComponent},
  { path: 'home-admin', component: HomeAdminComponent },
  {path: 'crear-usuario-admin', component: CrearUsuarioAdminComponent},
  {path: 'editar-noticia-admin', component: EditarNoticiaAdminComponent},
  {path: 'crud-usuarios', component: CrudUsuariosComponent},
  {path: 'edit-user-modal', component: EditUserModalComponent}
 ];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


