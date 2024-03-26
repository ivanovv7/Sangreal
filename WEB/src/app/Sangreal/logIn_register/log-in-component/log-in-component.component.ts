import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef,} from '@angular/material/dialog';

import { LogInUser } from '../interfaces/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';


export type LogInDialogResult =  'close' | LogInUser;
export interface logInData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-log-in-component',
  templateUrl: './log-in-component.component.html',
  styleUrl: './log-in-component.component.css'
})
export class LogInDialog implements OnInit {

   
  //DIALOG
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: logInData, // this data will be passed to the DIALOG do i need it ?
    private readonly dialogRef: MatDialogRef<LogInDialog, LogInDialogResult>
  ) {
  }

  ngOnInit(): void {
    
    this.syncForm()
  }

  closeDialog():void{
    this.dialogRef.close("close")
  }

  sigIn(user:LogInUser):void{
    this.dialogRef.close(user)
  }


  //FORM

  sigInForm!:FormGroup


  syncForm():void{

    this.sigInForm = new FormGroup({
      username: new FormControl("",[Validators.required]),
      password: new FormControl("", [Validators.required])
    })



  }

  onFormSubmit():void{

    const user:LogInUser = {
      username:this.sigInForm.get("username")?.value,
      password:this.sigInForm.get("password")?.value
    }

    this.sigIn(user)
  }
}
