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
  oldIncome = 0;

  constructor( private route: ActivatedRoute, private nav: NavController,
               private crudService: CrudService, private loagingController: LoadingController) { }

  ngOnInit() {
    // Obtengo el ID de mi ingreso
    this.incomeId = this.route.snapshot.params.id;
    if (this.incomeId) {
      this.loadIncome();
    }
  }


  // Cargo mi ingreso para editarlo
  async loadIncome() {
    const loading = await this.loagingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.crudService.getIncome(this.incomeId).subscribe(res => {
      loading.dismiss();
      this.income = res;
      console.log('argando ingreso')
      try {
        this.oldIncome = this.income.income;
      } catch {
        console.log('Poss me muero');
      }
    });
  }
  // Guardo mi ingreso o lo actualizo en caso de que exita el id
  async saveIncome() {
    const loading = await this.loagingController.create({
      message: 'Guardando...'
    });
    await loading.present();
    // En caso de que ya exista uno solo actualiza
    if (this.incomeId) {
      this.crudService.updateIncome(this.income, this.incomeId, this.oldIncome).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/tabs/tab2');
      });
    } else {
      // Aññado el ingreso si no existe el id
      this.crudService.addIncome(this.income).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/tabs/tab2');
      });
    }
  }

  // elimino el ingreso y redirijo
  onRemove() {
    if (this.incomeId) {
      this.crudService.removeIncome(this.incomeId, this.oldIncome);
      this.nav.navigateForward('/tabs/tab2');
    } else {
      this.nav.navigateForward('/tabs/tab2');
    }
  }
}
