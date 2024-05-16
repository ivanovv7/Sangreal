import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './interfaces/user';
import { Observable, catchError, map, of, tap } from 'rxjs';
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

  validateJwt():Observable<{message:string}>{
    const token:string|null = this.getToken();

    return this.http.get<{message:string}>('http://localhost:4321/auth/validateToken')
  }

  logout():void {
    localStorage.removeItem("authToken")
  }

  getToken():null | string {
     return localStorage.getItem("authToken");
  }

  isLoggedIn(): Observable<boolean> {
    return this.validateJwt().pipe(
      map((data) => data.message === 'valid'), //the map return observable, if the statement is true the observable will emmit true
      catchError((error) => {
        console.log('Error from validation', error);
        return of(false);
      })
    );
  }
}
