import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/types/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private router: ActivatedRoute) {}

  route = 'profile';
  username: string | undefined;
  user: User = {
    username: 'test_username',
    password: '',
    firstName: 'First',
    lastName: 'Last',
    phoneNumber: '',
    updateDate: new Date(),
    spotifyId: '',
    friendNames: [],
    reels: [],
    email: '',
    profilePic: null,
    bio: 'Welcome to my profile!',
  };
  ngOnInit(): void {
    console.log(this.router.snapshot.params);
    this.username = this.router.snapshot.params['username'];
  }
}
