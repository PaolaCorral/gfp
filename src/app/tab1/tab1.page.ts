import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Income, User } from '../interfaces/interfaces';
import { CrudService } from '../services/crud.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  incomes: Income[];
  user: User = {
    name: '',
    country: '',
    Totalincomes: 0
  };
  totalIncomes: number;

  constructor(private authService: AuthService, public router: Router, 
              private crudService: CrudService, private loagingController: LoadingController) {}
  ngOnInit() {
    this.loadUser();
  }

  // Obtiene la collection de usuarios para obtener el ingresosTotal
  async loadUser() {
    const loading = await this.loagingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.crudService.getUser().subscribe(res => {
      loading.dismiss();
      this.user = res;
      console.log('usuario', this.user.Totalincomes);
      this.totalIncomes = this.user.Totalincomes;
    });
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
