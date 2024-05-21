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
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './logIn_register/register/register.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './logIn_register/interceptor_token/token.interceptor';
import { RecepiesComponent } from './components/recepies/recepies.component';
import { CocktailsComponent } from './components/cocktails/cocktails.component';
import { WinesComponent } from './components/wines/wines.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { WhereToBuyComponent } from './components/where-to-buy/where-to-buy.component';

@NgModule({
  declarations: [
    HomeTestComponent,
    NavigationComponent,
    LogInDialog,
    RegisterComponent,
    RecepiesComponent,
    CocktailsComponent,
    WinesComponent,
    AboutUsComponent,
    WhereToBuyComponent
  ],
  imports: [
    CommonModule,
    RoutingSangrealModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [NavigationComponent],
  providers: [provideHttpClient(withInterceptors([tokenInterceptor]))],
})
export class SangrealModule {}
