import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Menu } from '../auth/menu.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`.angular-logo {
    margin: 0 4px 3px 0;
    height: 35px;
    vertical-align: middle;
}
.fill-remaining-space {
  flex: 1 1 auto;
}
`]
})
export class HeaderComponent implements OnInit {

  menus = [];

  isLoggedIn$: Observable<boolean>;  

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
    

    this.authService.isLoggedIn.subscribe(rs => {

        if (rs){

          if (this.authService.getUserSession != undefined){
            let usersesion = this.authService.getUserSession
            let arrayMenus = usersesion.Adm_Menus
            for (let i = 0; i < arrayMenus.length; i++) {
              let menu: Menu = new Menu(arrayMenus[i]);
              this.menus.push(menu);
            }
          }

        }else{
          this.menus = [];
        }
        
    });
      
  }

  onLogout(){
    this.authService.logout();                      // {3}
    this.router.navigate(['/login']);
  }


  onSelect(menu: Menu){
    console.log('ruta: ', menu.Opc_RutaPa);
    this.router.navigate([menu.Opc_RutaPa]);
  }

}
