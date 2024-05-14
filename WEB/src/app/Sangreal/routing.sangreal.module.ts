import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTestComponent } from './components/home-test/home-test.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './logIn_register/register/register.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { routeGuardGuard } from './-route-guard.guard';


const routes = [
  {
    path:'',
    component:HomeTestComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"protected",
    component:ProtectedComponent,
    canActivate:[routeGuardGuard]
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  // exports:[RouterModule]
})
export class RoutingSangrealModule { }
