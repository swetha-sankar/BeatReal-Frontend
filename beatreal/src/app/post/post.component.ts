import { Component, OnInit, Injectable } from '@angular/core';
import {
  SafeUrl, DomSanitizer
} from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
@Injectable()
export class PostComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer) {}

  liked = false;

  //sample posts to get from feed
  username = "lauren1";
	profilePic = "";
	reel = {songId: "71qKWIBggc7poNXclWN53M"};

  handleLike() {
    this.liked = !this.liked;
  }

  viewCommentsParent = false;
  toggleComments() {
    this.viewCommentsParent = !this.viewCommentsParent;
  }

  ngOnInit(): void {}


  getSpotify(songId: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://open.spotify.com/embed/track/${songId}?utm_source=generator`
    );
  }
}