import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './interfaces/user';
import { Observable, tap } from 'rxjs';
import { responseAuth } from '../logIn_register/interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}

  registerUser(newUser: User): Observable<string> {
    return this.http.post<string>(
      'http://localhost:4321/auth/register',
      newUser
    );
  }

  logInUser(user: User) {
    return this.http
      .post<responseAuth>('http://localhost:4321/auth/login', user)
      .pipe(
        tap((response: responseAuth) => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
          }
        })
      );
  }

  logout():void {
    localStorage.removeItem("authToken")
  }

  getToken():null | string {
     //TODO --->> this should make call to db and check if the token is valid, if the token is expired...
    return localStorage.getItem("authToken")
  }

  isLoggedIn():boolean{
    return !!this.getToken();
  }
}
