import { Component, OnInit } from '@angular/core';
import { SucursService } from '../ws/sucurs/sucurs.service';
import { ToastrService } from 'ngx-toastr';
import { sucursal  } from '../ws/sucurs/sucursal';
import { TipoDeAccion } from './tipoAccion';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss']
})

export class SucursalesComponent implements OnInit {

  public sucurs: [sucursal]; 
  public sucursal: sucursal;
  public isEnableEditar:boolean;
  public tipoAccion: TipoDeAccion;
  public isDelete: boolean;
  
  constructor(private ws: SucursService,
              private toastr: ToastrService){ 
      this.sucursal = new sucursal("","","","","");
      this.isEnableEditar = false;
      this.tipoAccion = TipoDeAccion.alta;   
      this.isDelete = false;       
  }

  ngOnInit() {
    
      this.ws.getSucursales().subscribe(result =>{

        if(result.CodigoRespuesta != 0){
          this.showError(result["Mensaje"])
        }else{
          this.sucurs =  result.data["sucursales"];
        }
      },
      error => {
        this.showError( <any>error["message"])
      })
  }

  private reloadSucurs(){

    this.ws.getSucursales().subscribe(result =>{

      if(result.CodigoRespuesta != 0){
        this.showError(result["Mensaje"])
      }else{
        this.sucurs =  result.data["sucursales"];
      }
    },
    error => {
      this.showError( <any>error["message"])
    })


  }

  onSubmit(){
    console.log(this.sucursal);
    //se manda a WS ALTA
    switch (this.tipoAccion){

      case TipoDeAccion.alta:{
        console.log("Alta...");
        this.ws.addSucursal(this.sucursal).subscribe(result =>{

          console.log(result);

          if(result.CodigoRespuesta != '000000'){
            this.showError(result["Mensaje"])
          }else{
            this.showExito(result["Mensaje"]);
            this.reloadSucurs()
          }
          
          }, error => {
            this.showError( <any>error["message"])
          })
        break;
      }

      case TipoDeAccion.baja:{
        console.log("baja...");
        this.ws.deleteSucursal(this.sucursal).subscribe(result =>{

          console.log(result);

          if(result.CodigoRespuesta != '000000'){
            this.showError(result["Mensaje"])
            this.reloadSucurs()
          }else{
            this.showExito(result["Mensaje"]);
            this.reloadSucurs()
          }
          
          }, error => {
            this.showError( <any>error["message"])
          })

        this.isDelete = false;
        break;
      }

      case TipoDeAccion.modificacion:{
        console.log("modificacion...");
        this.ws.updateSucursal(this.sucursal).subscribe(result =>{

          console.log(result);

          if(result.CodigoRespuesta != '000000'){
            this.showError(result["Mensaje"])
            this.reloadSucurs()
          }else{
            this.showExito(result["Mensaje"]);
            this.reloadSucurs()
          }
          
          }, error => {
            this.showError( <any>error["message"])
          })
        break;
      }

    }
  
    this.sucursal = new sucursal("","","","","");
    this.tipoAccion = TipoDeAccion.alta;
  }

  editar(suc:sucursal){
      this.sucursal = suc;
      this.tipoAccion = TipoDeAccion.modificacion;
      console.log(this.tipoAccion);
  }

  eliminar(suc:sucursal){
    this.isDelete = true;
    this.sucursal = suc;
    this.tipoAccion = TipoDeAccion.baja;
    console.log(this.tipoAccion);
  }

  limpiar(){

    console.log("Entro......");
    this.tipoAccion = TipoDeAccion.alta;
    this.isDelete = false;
    this.reloadSucurs();

  }


  showError(menssage: string) {
    this.toastr.error(menssage, 'Ops algo salio mal!', {
      timeOut: 4000,
    });
  }

  showExito(menssage: string) {
    this.toastr.success(menssage, 'Proceso exitoso!', {
      timeOut: 4000,
    });
  }

}
