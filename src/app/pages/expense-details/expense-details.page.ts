import { Component, OnInit } from '@angular/core';
import { Expense } from '../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.page.html',
  styleUrls: ['./expense-details.page.scss'],
})
export class ExpenseDetailsPage implements OnInit {
  expense: Expense = {
    product: '',
    date: '',
    expense: 0,
    category: '',
    description: ''
  };
  expenseId = null;

  constructor(private route: ActivatedRoute, private nav: NavController,
              private crudService: CrudService, private loagingController: LoadingController) { }

  ngOnInit() {
    // Obtiene el ID del egreso
    this.expenseId = this.route.snapshot.params.id;
    if (this.expenseId) {
      this.loadExpense();
    }
  }

  async loadExpense() {
    const loading = await this.loagingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.crudService.getExpense(this.expenseId).subscribe(res => {
      loading.dismiss();
      this.expense = res;
    });
  }

  // Guarda o actualiza egreso
  async saveExpense() {
    const loading = await this.loagingController.create({
      message: 'Guardando...'
    });
    await loading.present();
    if (this.expenseId) {
      this.crudService.updateExpense(this.expense, this.expenseId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/tabs/tab3');
      });
    } else {
      this.crudService.addExpense(this.expense).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/tabs/tab3');
      });
    }
  }

  // Elimina Egreso
  onRemove() {
    if (this.expenseId) {
      this.crudService.removeExpense(this.expenseId);
      this.nav.navigateForward('/tabs/tab3');
    } else {
      this.nav.navigateForward('/tabs/tab3');
    }
  }

}
