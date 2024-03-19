import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTestComponent } from './components/home-test/home-test.component';
import { RoutingSangrealModule } from './routing.sangreal.module';
import { NavigationComponent } from './components/navigation/navigation.component';



@NgModule({
  declarations: [HomeTestComponent,NavigationComponent],
  imports: [
    CommonModule,
    RoutingSangrealModule,

  ],
  exports:[NavigationComponent]
})
export class SangrealModule { }
