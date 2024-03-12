import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTestComponent } from './components/home-test/home-test.component';
import { RouterModule } from '@angular/router';


const routes = [
  {
    path:'home',
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
