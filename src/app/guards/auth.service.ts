import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dataBase = 'assets/dataBase.json';
  private validUser;

  constructor(private http: HttpClient, private router: Router) {
    this.getJSON().subscribe(data => {
      this.validUser = data;
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get(this.dataBase);
  }

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
    return new Promise<any>((resolve, reject) => {
      if (username ===  this.validUser.username && password ===  this.validUser.password) {
        localStorage.setItem('currentUser', JSON.stringify(username));
        this.router.navigateByUrl('dashboard');
        resolve(username);
      } else {
        reject('Invalid credentials');
      }
    });
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.router.navigateByUrl('login');
  }
}
