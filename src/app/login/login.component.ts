import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/guards/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) {
    this.auth.getCurrentUser()
      .then(user => {
        this.router.navigateByUrl('dashboard');
      });
  }

  username: string;
  password: string;
  ngOnInit() { }

  login(): void {
    this.auth.login(this.username, this.password)
    .then(res => {
      console.log('Nice, it worked!', res);
    }, err => {
      alert(err);
    });
  }

}
