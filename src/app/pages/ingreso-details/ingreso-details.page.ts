import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Ingreso } from 'src/app/interfaces/interfaces';
import { IngresosService } from '../../services/ingresos.service';

@Component({
  selector: 'app-ingreso-details',
  templateUrl: './ingreso-details.page.html',
  styleUrls: ['./ingreso-details.page.scss'],
})
export class IngresoDetailsPage implements OnInit {
  ingreso: Ingreso = {
    procedencia: '',
    cantidad: 0
  };
  ingresoId = null;

  constructor( private route: ActivatedRoute, private nav: NavController,
    private ingresoService: IngresosService, private loagingController: LoadingController) { }

  ngOnInit() {
    this.ingresoId = this.route.snapshot.params['id'];
    if (this.ingresoId) {
      this.loadIngreso();
    }
  }

  async loadIngreso() {
    const loading = await this.loagingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.ingresoService.getIngreso(this.ingresoId).subscribe(res => {
      loading.dismiss();
      this.ingreso = res;
    })
  }

  async saveIngreso() {
    const loading = await this.loagingController.create({
      message: 'Guardando...'
    });
    await loading.present();
    if(this.ingresoId) {
      this.ingresoService.updateIngreso(this.ingreso, this.ingresoId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/tabs/tab2');
      });
    } else {
      this.ingresoService.addIngreso(this.ingreso).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/tabs/tab2');
      });
    }
  }
  onRemove(idIngreso: string) {
    this.ingresoService.removeIngreso(idIngreso);
  }
}
