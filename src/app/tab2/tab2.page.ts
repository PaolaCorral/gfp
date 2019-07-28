import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public procedencia: '';
  public fecha: '';
  public Precio: number;
  public Descripcion: string;

  ngOnInit(): void {}

  constructor(private authService: AuthService, public router: Router) {}

  onGuardar() {
    this.authService.ingreso(this.procedencia, this.fecha, this.Precio, this.Descripcion).then( res => {
      this.router.navigate(['']);
      console.log(AuthService);
    }).catch(err => console.log(err));
  }
}
