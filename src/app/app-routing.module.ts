import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { AuthenticationGuard } from './authentication.guard';
import { CreateAccountPageComponent } from './create-account-page/create-account-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UnauthenticatedGuard } from './unauthenticated.guard';

const routes: Routes = [
  {path:'', component: HomePageComponent, canActivate:[AuthenticationGuard] },
  {path:'login', component: LoginPageComponent, canActivate:[UnauthenticatedGuard]},
  {path:'create-account', component: CreateAccountPageComponent, canActivate:[UnauthenticatedGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
