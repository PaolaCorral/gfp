import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Income, User } from '../interfaces/interfaces';
import { CrudService } from '../services/crud.service';
import { LoadingController } from '@ionic/angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  incomes: Income[];
  user: User = {
    name: '',
    country: '',
    TotalIncomes: 0,
    TotalExpenses: 0
  };
  public totalIncomes: number;
  public totalExpenses: number;

  constructor(private authService: AuthService, public router: Router,
              private crudService: CrudService, private loagingController: LoadingController) {}
  ngOnInit() {
    this.loadUser();
    /* this.doughnutChartMethod(); */
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
      this.totalIncomes = this.user.TotalIncomes;
      this.totalExpenses = this.user.TotalExpenses;
      // Grafico con chart.js con las  sumas de ingreso y egresos
      console.log(this.totalExpenses);
      console.log(this.user.TotalIncomes);
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: 'doughnut',
        data: {
          labels: ['Ingresos', 'Egresos'],
          datasets: [{
            label: '# of Votes',
            data: [this.totalIncomes, this.totalExpenses],
            backgroundColor: [
              'rgba(66, 155, 55, 0.2)',
              'rgba(251, 250, 252, 0.2)'
            ],
            hoverBackgroundColor: [
              '#429B37',
              '#FBFAFC'
            ]
          }]
        }
      });
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
