import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Income, User } from '../interfaces/interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  incomes: Income[];
  users: User[];

  constructor(private authService: AuthService, public router: Router, private crudService: CrudService) {}

  ngOnInit() {
    this.crudService.getIncomes().subscribe(res => {
      this.incomes = res;
    });

/*     this.crudService.get */
  }

  onRemove(idIngreso: string, oldIncome: number) {
    this.crudService.removeIncome(idIngreso, oldIncome);
    this.router.navigate(['//tabs/tab2']);
  }
}
