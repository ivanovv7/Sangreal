import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTestComponent } from './components/home-test/home-test.component';
import { RoutingSangrealModule } from './routing.sangreal.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { LogInDialog } from './logIn_register/log-in-component/log-in-component.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [HomeTestComponent, NavigationComponent, LogInDialog],
  imports: [
    CommonModule,
    RoutingSangrealModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [NavigationComponent],
})
export class SangrealModule {}
