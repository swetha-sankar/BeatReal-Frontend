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

  msg: string = '';
  login() {
    if (!this.loginForm.valid) {
      return;
    } else {
      this.http
        .post(this.url, {
          username: this.loginForm.value.username,
          password: this.loginForm.value.password,
        })
        .subscribe((result) => {
          console.log(result);
          this.router.navigateByUrl(
            `/profile/${this.loginForm.value.username}`
          );
        });
      return;
      /*
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
          if (response.ok) { 
            response.json().then(item=>
              console.log(item.data))
            
            this.router.navigateByUrl('/profile');
          }
          else{
            throw response;
          }
          

        }) */
    }
  }
}
