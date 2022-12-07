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
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {}
  user_id = sessionStorage.getItem('username');
  url = `http://localhost:3000/api/users/${this.user_id}`;
  first_name = '';
  last_name = '';
  bio = '';
  profilePic = null;
  route = 'profile';
  username: string | undefined;
  getSpotify(songId: string): SafeUrl {
    console.log(
      `https://open.spotify.com/embed/track/${songId}?utm_source=generator`
    );
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://open.spotify.com/embed/track/${songId}?utm_source=generator`
    );
  }
  ngOnInit(): void {
    this.http
        .get(this.url)
        .subscribe((res: any) => {
          if (res['status'] == 'ok') {
            console.log(res);
            this.first_name = res['result']['firstName'];
            this.last_name = res['result']['lastName'];
            this.bio = res['result']['bio'];
            this.profilePic = res['result']['profilePic'];
            console.log(res['result']['firstName']);
          }
          if (res['status'] == 'error') {
            console.log(res);
            alert(res['data']);
          }
        });
    }
  }

