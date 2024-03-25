import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTestComponent } from './components/home-test/home-test.component';
import { RouterModule } from '@angular/router';
import { LogInDialog } from './logIn_register/log-in-component/log-in-component.component';


const routes = [
  {
    path:'',
    component:HomeTestComponent
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
