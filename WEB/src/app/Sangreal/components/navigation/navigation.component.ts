import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInDialog, LogInDialogResult, logInData } from '../../logIn_register/log-in-component/log-in-component.component';
import { LogInUser } from '../../logIn_register/interfaces/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {


  constructor(private readonly dialog:MatDialog){}
  navBar: string[] = [
    'RECIPES',
    'COCKTAILS',
    'WINES',
    'ABOUT US',
    'WHERE TO BUY?',
  ];


  openSignInDialog():void{

    // what component to open / what is sent to dialog / what is recieved from dialog
   let dialogReference = this.dialog.open<LogInDialog,logInData,LogInDialogResult>(LogInDialog,{
      height:"400px",
      width:"530px",
      data:{username:"ivan",password:"Dd"}
    })

    dialogReference.beforeClosed().subscribe((data) => {
      console.log(`Data from dialog: ${data}`)
    })
  }


}
