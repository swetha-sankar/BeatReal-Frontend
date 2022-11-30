import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  phone_regex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  registerForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, [Validators.required]),
    firstname: new FormControl(null, [Validators.required, Validators.min(2)]),
    lastname: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(this.phone_regex)]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
  }
  )

  constructor(
    private router: Router,
  ) { }

  url = 'http://localhost:3000/security/register';

  register() {
    if (!this.registerForm.valid) {
      return;
    }
    return fetch(this.url, {
      method: 'post',
      // set headers for post
      headers: {
        'Content-Type': 'application/json',
      },
  
      // add body to post request
      body: JSON.stringify({
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        firstName: this.registerForm.value.firstname,
        lastName: this.registerForm.value.lastname,
        phoneNumber: this.registerForm.value.phoneNumber,
      }),
    })
    .then((response) => {
      if(response.ok) {
        this.router.navigateByUrl('/profile');
      }
      else{
        alert(`data equals: ${response}`)
        throw(response)
      }
    })
  }

  }
