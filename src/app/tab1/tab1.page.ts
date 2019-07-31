import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public authService: AuthService, private router: Router) {}

  OnLogout(){
    this.authService.logout();
  }
  onclickEgreso(){
    this.router.navigate(['/reg-egreso']);
  }
  onclickIngreso(){
    this.router.navigate(['/reg-ingreso']);
  }
}
