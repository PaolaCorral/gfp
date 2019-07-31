import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public name: string;
  public email: string;
  public password: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onSubmitRegister() {
    this.authService.register(this.email, this.password, this.name).then( authService => {
      this.router.navigate(['']);
      console.log(authService);
    }).catch(err => console.log(err));
  }

}
