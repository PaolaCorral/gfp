import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard} from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate : [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate : [NologinGuard] },
  { path: 'registro', loadChildren: './pages/registro/registro.module#RegistroPageModule', canActivate : [NologinGuard] }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
