import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dataBase = 'assets/dataBase.json';
  private validUsers;

  constructor(private http: HttpClient, private router: Router) {
    this.getJSON().subscribe(data => {
      this.validUsers = data.value;
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
      for (const user of this.validUsers) {
        if (username ===  user.username && password ===  user.password) {
          localStorage.setItem('currentUser', JSON.stringify(username));
          this.router.navigateByUrl('dashboard');
          return resolve(username);
        }
      }
      return reject('Invalid credentials');
    });
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.router.navigateByUrl('login');
  }
}
