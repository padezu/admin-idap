import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders,HttpParams} from '@angular/common/http'
import { AuthService } from '../../auth/auth.service'

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

}
