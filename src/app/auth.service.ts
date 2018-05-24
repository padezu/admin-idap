import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(username, password){

    var body = new HttpParams().set('usuario', username).set('contrasena', password);
    return this.http.post('http://idap.pagos.api/IniciarSesion', body.toString)
    
  }


}
