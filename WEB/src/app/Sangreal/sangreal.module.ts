import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTestComponent } from './components/home-test/home-test.component';
import { RoutingSangrealModule } from './routing.sangreal.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [HomeTestComponent,NavigationComponent],
  imports: [
    CommonModule,
    RoutingSangrealModule,
    MatIconModule

  ],
  exports:[NavigationComponent]
})
export class SangrealModule { }
