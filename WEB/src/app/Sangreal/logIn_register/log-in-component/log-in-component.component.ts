import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef,} from '@angular/material/dialog';

import { User } from '../interfaces/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { SangrealService } from '../../sangreal.service';


export type LogInDialogResult =  'close' | User;
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
    private readonly dialogRef: MatDialogRef<LogInDialog, LogInDialogResult>, private readonly authService:AuthServiceService,
    private readonly router:Router,
    private readonly sangrealService:SangrealService
  ) {
  }

  errorMessage:string = ""

  ngOnInit(): void {
    
    this.syncForm()
  }

  closeDialog():void{
    this.dialogRef.close("close")
  }

  sigIn(user:User):void{
    this.authService.logInUser(user).subscribe({
      next:(data) => {
        console.log("Log in data",data)
         this.dialogRef.close(user)
         this.sangrealService.populateSignedAs(data.username)
         this.router.navigate(["/"])
      },
      error:(error) => {
        console.log("Error",error.error.message)
        this.errorMessage = error.error.message
      },
      complete:() => {
        console.log("Completed")
      }
    })
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

    const user:User = {
      username:this.sigInForm.get("username")?.value,
      password:this.sigInForm.get("password")?.value
    }

    this.sigIn(user)
  }
}
