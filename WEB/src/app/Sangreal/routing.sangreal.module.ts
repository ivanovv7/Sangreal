import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTestComponent } from './components/home-test/home-test.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './logIn_register/register/register.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { routeGuardGuard } from './-route-guard.guard';
import { RecepiesComponent } from './components/recepies/recepies.component';
import { CocktailsComponent } from './components/cocktails/cocktails.component';
import { WinesComponent } from './components/wines/wines.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { WhereToBuyComponent } from './components/where-to-buy/where-to-buy.component';


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
    path:"recipes",
    component:RecepiesComponent
  },
  {
    path:"cocktails",
    component:CocktailsComponent
  },
  {
    path:"wines",
    component:WinesComponent
  },
  {
    path:"about-us",
    component:AboutUsComponent
  },
  {
    path:"where-to-buy",
    component:WhereToBuyComponent
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
