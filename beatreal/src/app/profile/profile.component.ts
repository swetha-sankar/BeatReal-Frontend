import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Reel, User } from 'src/types/types';
import { HttpClient } from '@angular/common/http';
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
    private WebReqService: WebRequestService,
    private http: HttpClient
  ) {}
  username = localStorage.getItem('username');
  url = `http://localhost:3000/api/users/${this.username}`;
  profilePic = null;
  route = 'profile';
  user: User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    updateDate: new Date(),
    spotifyId: '',
    friendNames: [],
    reels: [],
    email: '',
    profilePic: null,
    bio: '',
  };
  addFriendForm = this.formBuilder.group({
    friendName: '',
  });

  // getSpotify(songId: string): SafeUrl {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(
  //     `https://open.spotify.com/embed/track/${songId}?utm_source=generator`
  //   );
  // }

  addFriend() {
    this.WebReqService.patch('addFriend', {
      username: this.username,
      friendName: this.addFriendForm.value.friendName,
    }).subscribe(() => {
      (res: any) => {
        console.log(res);
      };
    });
    this.user.friendNames = [
      ...this.user.friendNames,
      this.addFriendForm.value.friendName!,
    ];
  }

  removeFriend(friendName: string) {
    this.WebReqService.patch('removeFriend', {
      username: this.username,
      friendName: friendName,
    }).subscribe(() => {
      (res: any) => {
        console.log(res);
      };
    });
    this.user.friendNames = this.user.friendNames.filter(
      (name: string) => name !== friendName
    );
  }

  ngOnInit(): void {
    this.http.get(this.url).subscribe((res: any) => {
      if (res['status'] == 'ok') {
        console.log(res);
        this.user = res['result'];
        this.user.reels = this.user.reels.map((reel: Reel) => ({
          ...reel,
          date: new Date(reel.date),
        }));
        /** 
            this.first_name = res['result']['firstName'];
            this.last_name = res['result']['lastName'];
            this.bio = res['result']['bio'];
            this.profilePic = res['result']['profilePic'];
            **/
      }
      console.log(this.user);
      if (res['status'] == 'error') {
        console.log(res);
        alert(res['data']);
      }
    });
  }
}
