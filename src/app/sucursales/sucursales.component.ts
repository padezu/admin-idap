import { Component, OnInit } from '@angular/core';
import { SucursService } from '../ws/sucurs/sucurs.service';
import { ToastrService } from 'ngx-toastr';
import { sucursal } from '../ws/sucurs/sucursal';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss']
})
export class SucursalesComponent implements OnInit {

  selectedValue?: sucursal;
  sucurs: [sucursal]; 
  
  selectedValue2: string;
  estatus = [
    {value: 'A', viewValue: 'Activo'},
    {value: 'I', viewValue: 'Inactivo'}
  ];

  constructor(private ws: SucursService,
              private toastr: ToastrService) { }

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


  showError(menssage: string) {
    this.toastr.error(menssage, 'Ops algo salio mal!', {
      timeOut: 4000,
    });
  }



}
