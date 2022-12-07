import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(
      null,
      Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')
    ),
  });
  constructor(private router: Router, private http: HttpClient) {}
  url = 'http://localhost:3000/security/token';

  login() {
    if (!this.loginForm.valid) {
      return;
    } else {
      this.http
        .post(this.url, {
          username: this.loginForm.value.username,
          password: this.loginForm.value.password,
        })
        .subscribe((res: any) => {
          if (res['status'] == 'ok') {
            console.log(res);
            sessionStorage.setItem(
              'username',
              `${this.loginForm.value.username}`
            );
            window.location.href = "http://localhost:3000/spotify/login";
            // this.router.navigateByUrl(`/profile`);
          }
          if (res['status'] == 'error') {
            console.log(res);
            alert(res['data']);
          }
        });
    }
    return;
  }
}
