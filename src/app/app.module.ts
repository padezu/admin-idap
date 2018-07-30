import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './app-material/app-material.module';
import { PagosComponent } from './pagos/pagos.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { AdminsComponent } from './admins/admins.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { FacturasComponent } from './facturas/facturas.component';
import { MatSelectModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatIconModule } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    PagosComponent,
    AdminsComponent,
    SucursalesComponent,
    AlumnosComponent,
    FacturasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    MatInputModule,
    MatIconModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
