import { Component, OnInit } from '@angular/core';
/* import { ActivatedRoute } from '@angular/router';
import { IngresosService } from 'src/app/services/ingresos.service';
import { LoadingController, NavController } from '@ionic/angular'; */
/* import { Ingreso } from 'src/app/interfaces/interfaces'; */

@Component({
  selector: 'app-reg-ingreso',
  templateUrl: './reg-ingreso.page.html',
  styleUrls: ['./reg-ingreso.page.scss'],
})
export class RegIngresoPage implements OnInit {
  /* ingreso: Ingreso = {
    procedencia: '',
    fecha: '',
    ingreso: 0,
    descripcion: ''
  };
  ingresoId = null;
 */
  constructor(/* private route: ActivatedRoute, private nav: NavController,
              private ingresoService: IngresosService, private loagingController: LoadingController */) { }

  ngOnInit() {
    /* this.ingresoId = this.route.snapshot.params.id; */
  }
 /*  async addIngreso() {
    const loading = await this.loagingController.create({
      message: 'Guardando...'
    });
    await loading.present();
    this.ingresoService.addIngreso(this.ingreso).then(() => {
      loading.dismiss();
      this.nav.navigateForward('/tabs/tab2');
    });
  } */

}
