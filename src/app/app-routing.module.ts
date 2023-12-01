import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SistemaComponent } from './carreras/sistema/sistema.component';
import { BioquimicaComponent } from './carreras/bioquimica/bioquimica.component';
import { EmpresarialComponent } from './carreras/empresarial/empresarial.component';
import { MecatronicaComponent } from './carreras/mecatronica/mecatronica.component';
import { NanotecnologiaComponent } from './carreras/nanotecnologia/nanotecnologia.component';
import { IndustrialComponent } from './carreras/industrial/industrial.component';
import { TicsComponent } from './carreras/tics/tics.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { CrearUsuarioAdminComponent } from './crear-usuario-admin/crear-usuario-admin.component';
import { EditarNoticiaAdminComponent } from './editar-noticia-admin/editar-noticia-admin.component';
import { AuthGuard } from './login/guard/guard.component';
import { CrudUsuariosComponent } from './crud-usuarios/crud-usuarios/crud-usuarios.component';
import { EditUserModalComponent } from './crud-usuarios/edit-user-modal/edit-user-modal.component';
import { RegisterModalComponent } from './crud-usuarios/register-modal/register-modal.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';





const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path:'signup', component: RegisterComponent},
  {path:'bioquimica', component:BioquimicaComponent},
  {path:'empresarial', component:EmpresarialComponent},
  {path:'insdustrial', component:IndustrialComponent},
  {path:'mecatronica', component:MecatronicaComponent},
  {path:'nanotecnologia', component: NanotecnologiaComponent},
  {path:'sistema', component: SistemaComponent},
  { path: 'home-admin', component: HomeAdminComponent, canActivate: [AuthGuard] },
  {path: 'crear-usuario-admin', component: CrearUsuarioAdminComponent, canActivate: [AuthGuard]},
  {path: 'editar-noticia-admin', component: EditarNoticiaAdminComponent, canActivate: [AuthGuard]},
  {path: 'tics', component: TicsComponent},
  {path:'bioquimica', component:BioquimicaComponent, canActivate: [AuthGuard]},
  {path:'empresarial', component:EmpresarialComponent, canActivate: [AuthGuard]},
  {path:'industrial', component:IndustrialComponent, canActivate: [AuthGuard]},
  {path:'mecatronica', component:MecatronicaComponent, canActivate: [AuthGuard]},
  {path:'nanotecnologia', component: NanotecnologiaComponent, canActivate: [AuthGuard]},
  {path:'sistema', component: SistemaComponent, canActivate: [AuthGuard]},
  { path: 'home-admin', component: HomeAdminComponent, canActivate: [AuthGuard] },
  {path: 'crear-usuario-admin', component: CrearUsuarioAdminComponent, canActivate: [AuthGuard]},
  {path: 'editar-noticia-admin', component: EditarNoticiaAdminComponent, canActivate: [AuthGuard]},
  {path: 'tics', component: TicsComponent, canActivate: [AuthGuard]},
  {path: 'admin-usuarios', component: CrudUsuariosComponent, canActivate: [AuthGuard]},
  {path: 'navbar', component: NavbarComponent, canActivate: [AuthGuard]},
  {path: 'footer', component: FooterComponent, canActivate: [AuthGuard]},
  {path: 'edit-user-modal', component: EditUserModalComponent},
  {path: 'register-modal', component: RegisterModalComponent,canActivate: [AuthGuard]}

 ];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


