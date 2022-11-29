import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')),
  });
  constructor(
    private router: Router,
  ) { }
  url = 'http://localhost:3000/security/token';

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    else {
      return fetch(this.url, {
        method: 'post',
        // set headers for post
        headers: {
          'Content-Type': 'application/json',
        },

        // add body to post request
        body: JSON.stringify({
          username: this.loginForm.value.username,
          password: this.loginForm.value.password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          this.router.navigateByUrl('/profile');

        })
    }

  }


}

