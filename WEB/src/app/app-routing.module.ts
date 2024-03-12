import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTestComponent } from './Sangreal/components/home-test/home-test.component';

const routes: Routes = [

  {
    path:"sangreal",
    loadChildren:() => import("./Sangreal/sangreal.module").then((m) => m.SangrealModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
