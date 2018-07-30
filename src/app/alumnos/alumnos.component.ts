import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../ws/alumnos/alumnos.service';
import { Alumno } from '../ws/alumnos/alumno';
import { sucursal } from '../ws/sucurs/sucursal';
import { SucursService } from '../ws/sucurs/sucurs.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { TipoDeAccion } from './tipoAccion';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
  providers: [AlumnosService]
})
export class AlumnosComponent implements OnInit {

  public alumnos: Array<Alumno>;
  public sucursal:sucursal;
  public sucursales:Array<sucursal>;
  public sucursalForm:sucursal;
  public sucursalesForm:Array<sucursal>;
  public isAdmin: boolean = false;
  public alumnoModal:Alumno;
  public alumno:Alumno;
  public tipoAccion: TipoDeAccion;
  public idSuc:String;
  public isAlta:boolean = false;
  public isEditing:boolean = false;
   
  constructor(private _alumnosService:AlumnosService,
              private _sucursService:SucursService,
              private _toastrService:ToastrService,
              private _authService: AuthService,
              private _router:Router
  ){
  this.sucursal = new sucursal("","","","","");
  this.sucursalForm = new sucursal("","","","","");
  this.alumno = new Alumno(0,"","","","","","","","","");
  this.alumnoModal = new Alumno(0,"","","","","","","","","");
  this.tipoAccion = TipoDeAccion.alta;
  this.idSuc = "";   
  }

  ngOnInit() {

    if (this._authService.getUserSession == null){
      this._router.navigate(['/']);
      return 
    }else{

      if (this._authService.getUserSession.Adm_UsTipo == "A")
        this.isAdmin = true
      
    }
    //Obterner  alumnos
    this._alumnosService.getAlumnos().subscribe(result =>{
      if(result.CodigoRespuesta != 0){
         this.showError(result["Mensaje"])
         this.alumnos = null;
      }else{
          this.alumnos = result.data.alumnos;
      }
    },error => {
      this.showError( <any>error["message"])
      this.alumnos = null;
    })

     //Obterner sucursales dispinibles
     this._sucursService.getSucursales().subscribe(result =>{
      if(result.CodigoRespuesta != 0){
        this.showError(result["Mensaje"])
      }else{
        this.sucursalesForm = result.data["sucursales"]; 
        this.sucursales =  result.data["sucursales"];
        this.sucursal.Suc_IDSucu = this._authService.getUserSession.Adm_Sucurs;
        if (!this.isAdmin){
          this.sucursalForm.Suc_IDSucu = this._authService.getUserSession.Adm_Sucurs;  
        }
      }
    },
    error => {
      this.showError( <any>error["message"])
    })
  }

  limpiar(){
    this.sucursalForm = new sucursal("","","","","");
    this.alumno = new Alumno(0,"","","","","","","","","");
    this.tipoAccion = TipoDeAccion.alta;
    this.idSuc = "";
    this.isEditing = false;
  }

  alta(){
    if (this.isAlta){  
      this.isAlta = false;
      this.limpiar();
    }else{
      this.isAlta = true;
    
    }
  }


  editar(alumno:Alumno){

    if (this.isEditing){
      this.isEditing = false;
      this.limpiar()
    }else{
      this.isEditing = true;
      this.tipoAccion = TipoDeAccion.modificacion;
      this.alumno = alumno;
      let filterSuc = this.sucursales.filter(suc => suc.Suc_Nombre === alumno.Suc_Nombre)[0];
      this.sucursalForm = filterSuc;

    }


  }


  reloadAlumnos(){

    this._alumnosService.getAlumnosID(this.sucursal.Suc_IDSucu).subscribe(result =>{
      if(result.CodigoRespuesta != 0){
         this.showError(result["Mensaje"])
         this.alumnos = null;
      }else{
          this.alumnos = result.data.alumnos;
      }
    },error => {
      this.showError( <any>error["message"])
      this.alumnos = null;
    })

  }

  onSubmit(){

    switch (this.tipoAccion){

      case TipoDeAccion.alta:{
        
        this._alumnosService.setAlumno(this.alumno,this.sucursalForm).subscribe(rs =>{
          if(rs.CodigoRespuesta != '000000'){
            this.showError(rs["Mensaje"])
            this.isAlta = false;
          }else{
            this.showExito(rs["Mensaje"]);
            this.reloadAlumnos();
            this.isAlta = false;
          }
        },error =>{
            this.showError( <any>error["message"])
            this.isAlta = false
        })
        break;
      }
      case TipoDeAccion.baja:{
        break;
      }
      case TipoDeAccion.modificacion:{
        this._alumnosService.updateAlumno(this.alumno,this.sucursalForm).subscribe(rs =>{
          if(rs.CodigoRespuesta != '000000'){
            this.showError(rs["Mensaje"])
            this.isAlta = false;
            this.reloadAlumnos();
            this.isEditing = false;
          }else{
            this.showExito(rs["Mensaje"]);
            this.reloadAlumnos();
            this.isAlta = false;
            this.isEditing = false;
          }
        },error =>{
          this.showError( <any>error["message"])
          this.isAlta = false
          this.reloadAlumnos();
          this.isEditing = false;
        })
        break;
      }


    }

  }


  delete(alumno:Alumno){

    this.alumnoModal = alumno;

  }

  deleteModal(){
    this._alumnosService.cancelAlumno(this.alumnoModal).subscribe(result =>{
      if(result.CodigoRespuesta != 0){
        this.showError(result["Mensaje"])
      }else{
        this.showExito(result["Mensaje"]);
        this.reloadAlumnos()
      }
    }, error =>{
        this.showError( <any>error["message"])
        
    })
  }

  findChange(){
  
       //Obterner  alumnos
       this._alumnosService.getAlumnosID(this.sucursal.Suc_IDSucu).subscribe(result =>{
        if(result.CodigoRespuesta != 0){
            this.showError(result["Mensaje"])
            this.alumnos = null
        }else{
            this.alumnos = result.data.alumnos;
        }
      },error => {
        this.showError( <any>error["message"])
        this.alumnos = null
      })
  }


  showError(menssage: string) {
    this._toastrService.error(menssage, 'Ops algo salio mal!', {
      timeOut: 4000,
    });
  }

  showExito(menssage: string) {
    this._toastrService.success(menssage, 'Proceso exitoso!', {
      timeOut: 4000,
    });
  }

}
