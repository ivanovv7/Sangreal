import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  constructor(private readonly authService: AuthServiceService) {}

  ngOnInit(): void {
    this.syncForm();
  }
  registerForm!: FormGroup;

  syncForm(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  async onFormSubmit(): Promise<void> {
    const newUser: User = {
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      permission: 'user',
    };

    this.authService.registerUser(newUser).subscribe({
      next: (data) => {
        console.log('Successfull register : ', data);
      },
      error: (error) => {
        console.log('ERROR', error);
      },
      complete: () => {
        console.log('from complete');
        this.registerForm.reset();
      },
    });
  }
}
