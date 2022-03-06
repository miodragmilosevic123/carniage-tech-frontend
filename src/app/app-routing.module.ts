import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoggedGuard } from './guards/logged-guard.service';
import { NotLoggedGuard } from './guards/not-logged-guard.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [LoggedGuard]},
  { path: 'auth', component: AuthComponent, canActivate: [NotLoggedGuard]},
  { path: '**', component: AuthComponent, canActivate: [NotLoggedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
