import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/types/types';
import { WebRequestService } from '../web-request.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private WebReqService: WebRequestService
  ) {
    this.username = sessionStorage.getItem('username')!;
  }

  route = 'profile';
  username: string | undefined;

  addFriendForm = this.formBuilder.group({
    friendName: '',
  });

  user: User = {
    username: 'test_username',
    password: '',
    firstName: 'First',
    lastName: 'Last',
    phoneNumber: '',
    updateDate: new Date(),
    spotifyId: '',
    friendNames: [],
    reels: [
      {
        reelId: 'saflkhasd',
        posterName: 'aidant',
        songId: '6gi6y1xwmVszDWkUqab1qw',
        date: new Date(),
        likes: [], // List of userNames's
        comments: [],
      },
      {
        reelId: 'asdfwq',
        posterName: 'aidant',
        songId: '6gi6y1xwmVszDWkUqab1qw',
        date: new Date(),
        likes: [], // List of userNames's
        comments: [],
      },
    ],
    email: '',
    profilePic: null,
    bio: 'Welcome to my profile!Welcome to my profile!Welcome to my profile!Welcome to my profile!Welcome to my profile!Welcome to my profile!Welcome to my profile!Welcome to my profile!Welcome to my profile!Welcome to my profile!Welcome to my profile!Welcome to my profile!Welcome to my profile!',
  };

  getSpotify(songId: string): SafeUrl {
    console.log(
      `https://open.spotify.com/embed/track/${songId}?utm_source=generator`
    );
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://open.spotify.com/embed/track/${songId}?utm_source=generator`
    );
  }

  addFriend() {
    this.WebReqService.patch('addFriend', {
      username: this.username,
      friendName: this.addFriendForm.value.friendName,
    }).subscribe(() => {
      (res: any) => {
        console.log(res);
      };
    });
    alert('added ' + this.addFriendForm.value.friendName);
  }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('username'));
  }
}
