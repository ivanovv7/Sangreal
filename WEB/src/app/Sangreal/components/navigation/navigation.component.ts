import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  LogInDialog,
  LogInDialogResult,
  logInData,
} from '../../logIn_register/log-in-component/log-in-component.component';
import { AuthServiceService } from '../../logIn_register/auth-service.service';
import { SangrealModule } from '../../sangreal.module';
import { SangrealService } from '../../sangreal.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit{
  menuOpen: boolean = false;
  loggedIn: boolean = false;
  signedInAs:string = '';
  dropdownOpen:boolean = true;

  navBar: string[] = [
    'RECIPES',
    'COCKTAILS',
    'WINES',
    'ABOUT US',
    'WHERE TO BUY'
  ];

  constructor(
    private readonly dialog: MatDialog,
    private readonly authService: AuthServiceService,
    private readonly sangrealService: SangrealService
  ) {}

  ngOnInit(): void {
    this.sangrealService.signedAs$.subscribe((data) => this.signedInAs = data)
    this.authService.isLoggedIn().subscribe();
    this.authService.isLoggedIn$.subscribe((data) => (this.loggedIn = data));
  }
  openSignInDialog(): void {
    const dialogReference = this.dialog.open<
      LogInDialog,
      logInData,
      LogInDialogResult
    >(LogInDialog, {
      height: '400px',
      width: '530px',
      data: { username: 'ivan', password: 'Dd' },
    });

    dialogReference.beforeClosed().subscribe((data) => {
      if (data === 'close' || data === undefined) return;
      console.log(`Data from dialog: ${data?.username}`);
    });
  }

  toLoverCase(sectionName: string): string {
    const path: string = sectionName.toLowerCase().replace(/ /g, '-');
    return path;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  signOut():void{
    this.authService.logout()
    this.toggleDropdown()
    this.signedInAs = '';
  }


// ngOnDestroy(): void {
//   this.authService.isLoggedIn().subscribe();
//   this.authService.isLoggedIn$.subscribe((data) => (this.loggedIn = data))
// }
  // isLoggedIn() {
  //   const $subscription = this.authService.isLoggedIn().subscribe({
  //     next: (data: boolean) => {
  //       this.loggedIn = data
  //     },
  //     complete: () => {
  //       $subscription.unsubscribe();
  //     },
  //     error: (error) => {
  //       console.log('Error from navbar', error);
  //     },
  //   });
  // }
}
