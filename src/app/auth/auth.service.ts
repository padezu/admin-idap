import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { HttpClient, HttpHeaders,HttpParams} from '@angular/common/http'
import { Usuario } from './usuario.model';
import { Menu } from './menu.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  private usuario?: Usuario;
  

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  setIsLoggedIn(){
    this.loggedIn.next(true);
  }


  constructor(private router: Router,
              private http: HttpClient) { 
  }

  login(user: User){
    if (user.userName !== '' && user.password !== '' ) { // {3}
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  get getUserSession(){
      return this.usuario;
  }

  setUserSession(user: Usuario){
    this.usuario = user
  }

  SingIn(user: User){

    let usuario = user.userName;
    let contrasena = user.password;
    return this.http.post('http://idap.pagos.api/IniciarSesion', JSON.stringify({usuario, contrasena}), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')});
  
  }

  logout() {                        
    this.loggedIn.next(false);
    this.usuario = null;

  }

  
  

}
