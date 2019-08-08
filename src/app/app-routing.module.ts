import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard} from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate : [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate : [NologinGuard] },
  { path: 'registro', loadChildren: './pages/registro/registro.module#RegistroPageModule', canActivate : [NologinGuard] },
  { path: 'reg-ingreso', loadChildren: './pages/reg-ingreso/reg-ingreso.module#RegIngresoPageModule' },
  { path: 'reg-egreso', loadChildren: './pages/reg-egreso/reg-egreso.module#RegEgresoPageModule' },
  { path: 'Idetails/:id', loadChildren: './pages/ingreso-details/ingreso-details.module#IngresoDetailsPageModule' },
  { path: 'Idetails', loadChildren: './pages/ingreso-details/ingreso-details.module#IngresoDetailsPageModule'},
  { path: 'Edetails/:id', loadChildren: './pages/expense-details/expense-details.module#ExpenseDetailsPageModule' },
  { path: 'Edetails', loadChildren: './pages/expense-details/expense-details.module#ExpenseDetailsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
