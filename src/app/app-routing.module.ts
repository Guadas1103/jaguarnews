import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SistemaComponent } from './carreras/sistema/sistema.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { CrearUsuarioAdminComponent } from './crear-usuario-admin/crear-usuario-admin.component';
<<<<<<< HEAD
import { AuthGuard } from './login/guard/guard.component';




=======
import { EditarNoticiaAdminComponent } from './editar-noticia-admin/editar-noticia-admin.component';
import { AuthGuard } from './guards/auth.guards';
>>>>>>> e9745650da9e0cef8ea2bc30fbaf8952b3740e8f
const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path:'signup', component: RegisterComponent},
  {path:'sistema', component: SistemaComponent},
  { path: 'home-admin', component: HomeAdminComponent },
  {path: 'crear-usuario-admin', component: CrearUsuarioAdminComponent},
  {path: 'editar-noticia-admin', component: EditarNoticiaAdminComponent}
 ];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


