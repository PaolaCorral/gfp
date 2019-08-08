import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Income } from '../interfaces/interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  incomes: Income[];

  constructor(private authService: AuthService, public router: Router, private crudService: CrudService) {}
  ngOnInit() {
    /* this.crudService.getIncomes(); */
  }

  OnLogout() {
    this.authService.logout();
  }
  onclickEgreso() {
    this.router.navigate(['/reg-egreso']);
  }
  onclickIngreso() {
    this.router.navigate(['/reg-ingreso']);
  }
}
