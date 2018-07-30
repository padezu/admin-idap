import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Alumno } from './alumno';
import { sucursal } from '../sucurs/sucursal';

@Injectable()
export class AlumnosService{

    constructor(
        private _http: HttpClient,
        private _authService: AuthService,
        private _router:Router){}
        
    getAlumnos():Observable<any>{

        if (this._authService.getUserSession == null){
            this._router.navigate(['/']);
        }else{

            let id =  Number(this._authService.getUserSession.Adm_Sucurs);
            return this._http.get('http://idap.pagos.api/getAlumnos/' + id, {headers: new HttpHeaders()
            .set('Api-Key', this._authService.getUserSession.Adm_ApiKey)})

        }
    }

    getAlumnosID(id:string):Observable<any>{

        if (this._authService.getUserSession == null){
            this._router.navigate(['/']);
        }else{
            return this._http.get('http://idap.pagos.api/getAlumnos/' + id, {headers: new HttpHeaders()
            .set('Api-Key', this._authService.getUserSession.Adm_ApiKey)})

        }
    }

    setAlumno(alumno:Alumno,sucurs:sucursal):Observable<any>{


        if (this._authService.getUserSession == null){
            this._router.navigate(['/']);
        }else{
            let nombre = alumno.Alu_Nombre;
            let apaterno = alumno.Alu_ApePat;
            let amaterno = alumno.Alu_ApeMat;
            let usuario = alumno.Alu_Usuari;
            let password = alumno.Alu_Passwo;
            let matricula = alumno.Alu_Matric;
            let tipo  = 2;
            let codactiva = "";
            let sucursal = sucurs.Suc_IDSucu;
            let tipoalt = "S";
            let json = {nombre, apaterno, amaterno, usuario, password,
                        matricula, tipo, codactiva, sucursal, tipoalt};
            return this._http.post('http://idap.pagos.api/addAlumno', JSON.stringify({json}), {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Api-Key', this._authService.getUserSession.Adm_ApiKey)});

        }

    }

    updateAlumno(alumno:Alumno,sucurs:sucursal):Observable<any>{


        if (this._authService.getUserSession == null){
            this._router.navigate(['/']);
        }else{
            let id = alumno.Alu_IDAlum;
            let nombre = alumno.Alu_Nombre;
            let apaterno = alumno.Alu_ApePat;
            let amaterno = alumno.Alu_ApeMat;
            let usuario = alumno.Alu_Usuari;
            let password = alumno.Alu_Passwo;
            let matricula = alumno.Alu_Matric;
            let tipo  = 2;
            let sucursal = sucurs.Suc_IDSucu;
            let json = {id,nombre, apaterno, amaterno, usuario, 
                        password,  matricula, tipo, sucursal};
            return this._http.post('http://idap.pagos.api/updateAlumno', JSON.stringify({json}), {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Api-Key', this._authService.getUserSession.Adm_ApiKey)});

        }

    }

    cancelAlumno(alumno:Alumno):Observable<any>{


        if (this._authService.getUserSession == null){
            this._router.navigate(['/']);
        }else{
            let id = alumno.Alu_IDAlum;
            
            let json = {id};
            return this._http.post('http://idap.pagos.api/cancelAlumno', JSON.stringify({json}), {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Api-Key', this._authService.getUserSession.Adm_ApiKey)});

        }

    }


}


