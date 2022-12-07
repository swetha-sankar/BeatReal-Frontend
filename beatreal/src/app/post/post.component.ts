import { Component, OnInit, Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
//import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/map';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
@Injectable()
export class PostComponent implements OnInit {
  //constructor (private http: Http) {}
  constructor(private httpClient: HttpClient) {}

  liked = false;

  handleLike() {
    this.liked = !this.liked;
  }

  viewCommentsParent = false;
  toggleComments() {
    this.viewCommentsParent = !this.viewCommentsParent;
  }

  ngOnInit(): void {}
  
  updateSong(songId: String) {
    let url = "https://open.spotify.com/embed/track/"+songId+"?utm_source=generator";
    document.getElementById("postIframe").src = url;
  }
}