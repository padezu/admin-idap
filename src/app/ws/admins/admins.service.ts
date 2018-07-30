import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { User } from './user';

@Injectable()

export class AdminsService{

    constructor(
        private _http: HttpClient,
        private _authService: AuthService){}

  
    getTipos(): Observable<any>{
            
        return this._http.get('http://idap.pagos.api/getTipos', {headers: new HttpHeaders()
        .set('Api-Key', this._authService.getUserSession.Adm_ApiKey)})

    }

    getUsuarios(): Observable<any>{
    
        let id =  Number(this._authService.getUserSession.Adm_IDUsua);
        return this._http.post('http://idap.pagos.api/getAdmins', JSON.stringify({id}), {
          headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Api-Key', this._authService.getUserSession.Adm_ApiKey)});

    }

    addUsuario(user:User): Observable<any>{

        let usuario = user.Adm_Usuari; 
        let contrasena = user.Adm_Passwo
        let sucursal = user.Adm_Sucurs;
        let tipo = user.Adm_UsTipo;
        let json = {usuario, contrasena, sucursal,tipo};

        return this._http.post('http://idap.pagos.api/addUsuario', JSON.stringify({json}), {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Api-Key', this._authService.getUserSession.Adm_ApiKey)});

    }

    updateUsuario(user:User): Observable<any>{

        let id = user.Adm_IDUsua;
        let usuario = user.Adm_Usuari; 
        let contrasena = user.Adm_Passwo
        let sucursal = user.Adm_Sucurs;
        let tipo = user.Adm_UsTipo;
        let json = {id, usuario, contrasena, sucursal, tipo};

        return this._http.post('http://idap.pagos.api/updateUsuario', JSON.stringify({json}), {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Api-Key', this._authService.getUserSession.Adm_ApiKey)});

    }

    cancelUsuario(user:User): Observable<any>{

        let id = user.Adm_IDUsua;
        let json = {id};

        return this._http.post('http://idap.pagos.api/cancelUsuario', JSON.stringify({json}), {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Api-Key', this._authService.getUserSession.Adm_ApiKey)});

    }


}

