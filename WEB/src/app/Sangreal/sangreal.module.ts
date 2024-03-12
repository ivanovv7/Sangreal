import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTestComponent } from './components/home-test/home-test.component';
import { RoutingSangrealModule } from './routing.sangreal.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [HomeTestComponent],
  imports: [
    CommonModule,
    RoutingSangrealModule,

  ]
})
export class SangrealModule { }
