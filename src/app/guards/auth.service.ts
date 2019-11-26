import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public getCurrentUser(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const user = localStorage.getItem('currentUser');
      if (user) {
        resolve(user);
      } else {
        reject('No user logged in');
      }
    });
  }

  login(username: string, password: string) {
    const ParseHeaders = { headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
     })};
    const data = 'username=' + username + '&password=' + password;

    return new Promise<any>((resolve, reject) => {
      this.http.post('/api/v1/login', data, ParseHeaders).subscribe((res) => {
        if (res) {
          localStorage.setItem('currentUser', JSON.stringify(username));
          this.router.navigateByUrl('dashboard');
          return resolve(res);
        } else {
          return reject('Invalid credentials');
        }
      });

    });
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.router.navigateByUrl('login');
  }
}
