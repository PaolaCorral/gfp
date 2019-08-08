import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Income } from 'src/app/interfaces/interfaces';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-ingreso-details',
  templateUrl: './ingreso-details.page.html',
  styleUrls: ['./ingreso-details.page.scss'],
})
export class IngresoDetailsPage implements OnInit {
  income: Income = {
    source: '',
    date: '',
    income: 0,
    description: ''
  };
  incomeId = null;

  constructor( private route: ActivatedRoute, private nav: NavController,
               private crudService: CrudService, private loagingController: LoadingController) { }

  ngOnInit() {
    console.log(this.route.snapshot.params.id);
    this.incomeId = this.route.snapshot.params.id;
    if (this.incomeId) {
      this.loadIncome();
    }
  }

  async loadIncome() {
    const loading = await this.loagingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.crudService.getIncome(this.incomeId).subscribe(res => {
      loading.dismiss();
      this.income = res;
    })
  }

  async saveIncome() {
    console.log(this.income, '+', this.incomeId)
    const loading = await this.loagingController.create({
      message: 'Guardando...'
    });
    await loading.present();
    if(this.incomeId) {
      this.crudService.updateIncome(this.income, this.incomeId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/tabs/tab2');
      });
    } else {
      console.log('hey');
      this.crudService.addIncome(this.income).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/tabs/tab2');
      });
    }
  }
  onRemove() {
    if(this.incomeId) {
      this.crudService.removeIncome(this.incomeId);
      this.nav.navigateForward('/tabs/tab2');
    } else {
      this.nav.navigateForward('/tabs/tab2');
    }
  }
}
