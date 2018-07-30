import { Component, OnInit} from '@angular/core';
import { User } from '../ws/admins/user';
import { sucursal } from '../ws/sucurs/sucursal';
import { SucursService } from '../ws/sucurs/sucurs.service';
import { ToastrService } from 'ngx-toastr';
import { AdminsService } from '../ws/admins/admins.service';
import { TipoUsuario } from '../ws/admins/TipoUsuario';
import { TipoDeAccion } from './tipoAccion';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
  providers: [AdminsService]
})
export class AdminsComponent implements OnInit {

  public user: User;
  public userModal: User;
  public sucursal:sucursal;
  public sucursales:Array<sucursal>;
  public usuarios:Array<User>;
  public tipos:Array<TipoUsuario>;
  public tipo: TipoUsuario;
  public isDelete = false;
  public isEditing = false;
  public isAlta = false;
  public tipoAccion: TipoDeAccion;
  
  constructor(
    private _sucursService:SucursService,
    private _toastrService:ToastrService, 
    private _adminsService:AdminsService
  ) { 
    this.sucursal = new sucursal("","","","","");
    this.user = new User(0,"","","","","","","","");
    this.userModal = new User(54,"","","","","","","","");
    this.tipo = new TipoUsuario("","","","");
    this.tipoAccion = TipoDeAccion.alta;   
  }

  ngOnInit() {

    //Obterner sucursales dispinibles
    this._sucursService.getSucursales().subscribe(result =>{
      if(result.CodigoRespuesta != 0){
        this.showError(result["Mensaje"])
      }else{
        this.sucursales =  result.data["sucursales"];
      }
    },
    error => {
      this.showError( <any>error["message"])
    })

    //obtener tipos de usuarios
    this._adminsService.getTipos().subscribe(rs =>{
      if(rs.CodigoRespuesta != 0){
        this.showError(rs["Mensaje"])
      }else{
        this.tipos = rs.data["tipos"];
        console.log("Mis tipos: -------", this.tipos);
      
      }
    },error => {
      this.showError( <any>error["message"])
    })

    this.reloadUsers();
  }

  onSubmit(){
    
    switch (this.tipoAccion){

      case TipoDeAccion.alta:{
        this.user.Adm_Sucurs = this.sucursal.Suc_IDSucu;
        this.user.Adm_UsTipo = this.tipo.Tip_TipoUs;
        this._adminsService.addUsuario(this.user).subscribe(rs =>{
          if(rs.CodigoRespuesta != '000000'){
            this.showError(rs["Mensaje"])
            this.isAlta = false;
          }else{
            this.showExito(rs["Mensaje"]);
            this.reloadUsers();
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
          this.user.Adm_Sucurs = this.sucursal.Suc_IDSucu;
          this.user.Adm_UsTipo = this.tipo.Tip_TipoUs;
          this._adminsService.updateUsuario(this.user).subscribe(rs =>{
            if(rs.CodigoRespuesta != '000000'){
              this.showError(rs["Mensaje"])
              this.limpiar();
              this.isEditing = false;
              this.reloadUsers();
            }else{
              this.showExito(rs["Mensaje"]);
              this.limpiar();
              this.reloadUsers();
            }
          },error =>{
              this.showError( <any>error["message"])
              this.limpiar();
              this.reloadUsers();
          })
        break;
      }
    }
  }

  delete(user:User){
      this.userModal = user;
  }

  deleteModal(){

    this._adminsService.cancelUsuario(this.userModal).subscribe(rs =>{
      if(rs.CodigoRespuesta != '000000'){
        this.showError(rs["Mensaje"])
        this.limpiar();
        this.reloadUsers();
      }else{
        this.showExito(rs["Mensaje"]);
        this.limpiar();
        this.reloadUsers();
      }
    },error =>{
        this.showError( <any>error["message"])
        this.limpiar();
        this.reloadUsers();
    })
    
  }

  alta(){
    if (this.isAlta){
      this.isAlta = false;
    }else{
      this.isAlta = true;
    } 
  }


  editar(usuario:User){

    if (this.isEditing){
      this.isEditing = false;
      this.sucursal = new sucursal("","","","","");
      this.user = new User(0,"","","","","","","","");
      this.tipo = new TipoUsuario("","","","");
      this.tipoAccion = TipoDeAccion.alta;   

    }else{

      this.isEditing = true;
      this.user = usuario;
      this.sucursal.Suc_IDSucu = usuario.Adm_Sucurs;
      this.tipo.Tip_TipoUs = usuario.Adm_UsTipo;
      this.tipoAccion = TipoDeAccion.modificacion;
      
    }

  }

  limpiar(){
    this.isEditing = false;
    this.sucursal = new sucursal("","","","","");
    this.user = new User(0,"","","","","","","","");
    this.tipo = new TipoUsuario("","","","");
    this.tipoAccion = TipoDeAccion.alta;   
  }

  reloadUsers(){
    //obtener usuarios registrados
    this._adminsService.getUsuarios().subscribe(rs =>{
      this.usuarios = rs.data["usuarios"];
      console.log(this.usuarios);
    },error =>{
       this.showError( <any>error["message"])
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
