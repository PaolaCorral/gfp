import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { Ingreso } from '../interfaces/interfaces';
import { IngresoDetailsPageModule } from '../pages/ingreso-details/ingreso-details.module';
import { IngresosService } from '../services/ingresos.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule implements OnInit {

  ingresos: Ingreso[];

  constructor(public router: Router, private ingresosService: IngresosService) {}
  ngOnInit(): void {
    this.ingresosService.getIngresos().subscribe(res => {
      this.ingresos = res;
    });
  }
}
