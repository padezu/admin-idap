import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { AuthService } from '../../auth/auth.service'
import { sucursal } from './sucursal';

@Injectable({
  providedIn: 'root'
})
export class SucursService {
        
  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getSucursales(): Observable<any>{

    return this.http.get('http://idap.pagos.api/getSucurs', {headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Api-Key', this.authService.getUserSession.Adm_ApiKey)})
  }

  addSucursal(sucursal:sucursal): Observable<any>{

    let nombre = sucursal.Suc_Nombre;
    let prefijo = sucursal.Suc_Prefij;
    let json = {nombre, prefijo};
    return this.http.post('http://idap.pagos.api/addSucursal', JSON.stringify({json}), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Api-Key', this.authService.getUserSession.Adm_ApiKey)});

  }

  updateSucursal(sucursal:sucursal): Observable<any>{

    let id = Number(sucursal.Suc_IDSucu);
    let nombre = sucursal.Suc_Nombre;
    let prefijo = sucursal.Suc_Prefij;
    let json = {id, nombre, prefijo};

    return this.http.post('http://idap.pagos.api/updateSucursal', JSON.stringify({json}), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Api-Key', this.authService.getUserSession.Adm_ApiKey)});

  }

  deleteSucursal(sucursal:sucursal):Observable<any>{

    let id = Number(sucursal.Suc_IDSucu);
    let json = {id};

    return this.http.post('http://idap.pagos.api/deleteSucursal', JSON.stringify({json}), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Api-Key', this.authService.getUserSession.Adm_ApiKey)});

  }




}
