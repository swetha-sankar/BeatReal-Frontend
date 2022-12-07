import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WebRequestService } from '../web-request.service';
import { HttpClient } from '@angular/common/http';

interface FormObject {
  firstName: string;
  lastName: string;
  bio: string;
}

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  username: string = '';
  constructor(private WebReqService: WebRequestService, private http: HttpClient ) {
    this.username = localStorage.getItem('username')!;
  }
  ngOnInit(): void {
    this.getUser();
    console.log('hello');
  }

  userObject: any;
  getUser() {
    this.WebReqService.get(`users/${this.username}`).subscribe((res: any) => {
      this.userObject = res.result;
      this.userObject.newUserName = null;
      this.userObject.oldUserName = localStorage.getItem(`username`);
      console.log(this.userObject);
    });
  }

  editProfileForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    bio: new FormControl(null, [Validators.required]),
  });
  profilePicForm = new FormGroup({
    profilePic: new FormControl(null, [Validators.required]),
  });

  onSubmit() {
    //Object.keys will find all the keys in the form group such as Username, Firstname ...
    //for each key we will use that as an index for form.value[key].
    //'keyof formobject' must be specified
    Object.keys(this.editProfileForm.controls).forEach((control: string) => {
      if (this.editProfileForm.value[control as keyof FormObject] != null) {
        console.log('hello');
        switch (control) {
          case 'firstName':
            this.userObject.firstName =
              this.editProfileForm.value[control as keyof FormObject]!;
            break;
          case 'lastName':
            this.userObject.lastName =
              this.editProfileForm.value[control as keyof FormObject]!;
            break;
          case 'bio':
            console.log("hello swetha");
            this.userObject.bio =
              this.editProfileForm.value[control as keyof FormObject]!;
            break;
        }
      }
    });
    this.editUserRequest();
  }

  editUserRequest() {
    console.log(this.userObject);
    this.WebReqService.patch('editUser', this.userObject).subscribe(() => {
      (res: any) => {
        console.log(res);
      };
    });
  }
}
