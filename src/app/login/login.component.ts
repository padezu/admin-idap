import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../auth/auth.service';
import { Usuario } from '../auth/usuario.model';
import { Menu } from '../auth/menu.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;                    // {1}
  private formSubmitAttempt: boolean; // {2}

  constructor(
    private fb: FormBuilder,         // {3}
    private authService: AuthService, // {4}
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({     // {5}
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  isFieldInvalid(field: string) { // {6}
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {

        this.authService.SingIn(this.form.value).subscribe((res) => { 
        
          if (res["CodigoRespuesta"] == 0){
            
            let user = new Usuario(res["data"]["usuario"])
            let arrayMenus = res["data"]["usuario"]["Adm_Menus"]
            user.Adm_Menus = arrayMenus.map((menu: any) => new Menu(menu));
            this.authService.setUserSession(user);
            this.authService.setIsLoggedIn()
            this.router.navigate(['/alumnos']);
          }else{            
            this.showError(res["Mensaje"]);
          }
  
        },(error) => {
          
          this.showError(error["message"]);
        
        });

    }
    this.formSubmitAttempt = true;             // {8}
  }

  showError(menssage: string) {
    this.toastr.error(menssage, 'Ops algo salio mal!', {
      timeOut: 4000,
    });
  }

}
