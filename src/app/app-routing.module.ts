import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { PagosComponent } from './pagos/pagos.component';
import { AdminsComponent } from './admins/admins.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { FacturasComponent } from './facturas/facturas.component';

const routes: Routes = [ 
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'pagos', component: PagosComponent },
  { path: 'admins', component: AdminsComponent },
  { path: 'sucursales', component: SucursalesComponent },
  { path: 'alumnos', component: AlumnosComponent },
  { path: 'facturas', component: FacturasComponent },
  { path: '**', redirectTo: ''}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
