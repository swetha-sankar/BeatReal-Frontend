import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { User } from 'src/types/user';
import { WebRequestService } from '../web-request.service';

interface formObject {
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  bio: string;
}

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  constructor(private WebReqService: WebRequestService) {}
  ngOnInit(): void {
    this.getUser();
  }

  userObject: User = {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    spotifyId: '',
    friendIds: [],
    reels: [],
    email: '',
    profilePic: null,
    bio: '',
  };
  getUser() {
    this.WebReqService.get('users/638badeec1f073c30c2aa54b').subscribe(
      (res: any) => {
        this.userObject = res.result;
        console.log(this.userObject);
      }
    );
  }

  editProfileForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
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
      if (this.editProfileForm.value[control as keyof formObject] != null) {
        switch (control) {
          case 'username':
            this.userObject.username =
              this.editProfileForm.value[control as keyof formObject]!;
            break;
          case 'firstName':
            this.userObject.firstName =
              this.editProfileForm.value[control as keyof formObject]!;
            break;
          case 'lastName':
            this.userObject.lastName =
              this.editProfileForm.value[control as keyof formObject]!;
            break;
          case 'phoneNumber':
            this.userObject.phoneNumber =
              this.editProfileForm.value[control as keyof formObject]!;
            break;
          case 'bio':
            this.userObject.bio =
              this.editProfileForm.value[control as keyof formObject]!;
            break;
        }
      }
    });
    this.editUserRequest();
    this.editProfileForm.reset();
  }

  editUserRequest() {
    this.WebReqService.put(
      'editUser/638badeec1f073c30c2aa54b', //dummy value user
      this.userObject
    ).subscribe(() => {
      (res: any) => {
        console.log(res);
      };
    });
  }
}
