import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from '../interfaces/interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  
  expenses: Expense[];

  constructor(public router: Router, private crudService: CrudService) {}
 
  ngOnInit(): void {
    this.crudService.getExpenses().subscribe(res => {
      this.expenses = res;
    });
  }

  onRemove(idExpense: string, empense: any) {
    this.crudService.removeExpense(idExpense);
    this.router.navigate(['//tabs/tab3']);
  }
}
