import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private AFauth: AngularFireAuth, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.AFauth.authState.pipe(map(auth => {

        // tslint:disable-next-line: deprecation
        if (isNullOrUndefined(auth)) {
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      }));
  }
}
