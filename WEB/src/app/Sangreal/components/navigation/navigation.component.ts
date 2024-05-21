import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInDialog, LogInDialogResult, logInData } from '../../logIn_register/log-in-component/log-in-component.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  menuOpen: boolean = false;

  navBar: string[] = [
    'RECIPES',
    'COCKTAILS',
    'WINES',
    'ABOUT US',
    'WHERE TO BUY',
  ];

  constructor(private readonly dialog: MatDialog) {}

  openSignInDialog(): void {
    const dialogReference = this.dialog.open<LogInDialog, logInData, LogInDialogResult>(LogInDialog, {
      height: '400px',
      width: '530px',
      data: { username: 'ivan', password: 'Dd' },
    });

    dialogReference.beforeClosed().subscribe((data) => {
      if (data === 'close' || data === undefined) return;
      console.log(`Data from dialog: ${data?.username}`);
    });
  }

  toLoverCase(sectionName:string):string{
    const path: string = sectionName.toLowerCase().replace(/ /g, '-');
    return path
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
