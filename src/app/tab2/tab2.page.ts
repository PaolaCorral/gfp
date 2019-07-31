import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { IngresosService } from '../services/ingresos.service';
import { Ingreso } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  ingresos: Ingreso[];

  constructor(private authService: AuthService, public router: Router, private ingresosService: IngresosService) {}

  ngOnInit() {
    this.ingresosService.getIngresos().subscribe(res => {
      this.ingresos = res;
      console.log(res);
    })
  }

  onclickIngreso(){
    this.router.navigate(['/reg-ingreso']);
  }
}
