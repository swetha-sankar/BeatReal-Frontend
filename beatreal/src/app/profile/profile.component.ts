import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeScript,
  SafeStyle,
  SafeUrl,
} from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/types/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

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

  /**"https://open.spotify.com/embed/track/{{
              reel.songId
            }}?utm_source=generator" */

  getSpotify(songId: string): SafeUrl {
    console.log(
      `https://open.spotify.com/embed/track/${songId}?utm_source=generator`
    );
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://open.spotify.com/embed/track/${songId}?utm_source=generator`
    );
  }

  ngOnInit(): void {
    console.log(this.router.snapshot.params);
    this.username = this.router.snapshot.params['username'];
  }
}
