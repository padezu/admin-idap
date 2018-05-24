import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
declare var jQuery: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  loginUser(event){
    event.preventDefault()
    const target = event.target
    const username = target.querySelector('#usuario').value 
    const password = target.querySelector('#password').value
    
    this.authService.login(username,password).subscribe((res) => {
          console.log(res["CodigoRespuesta"]);

          if (res["CodigoRespuesta"] == 0){

          }else{
            
          }
     });
    
  }

}
