import { Component, OnInit, Injectable, Input } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
//import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Post } from 'src/types/post';
import { Reel } from 'src/types/reel';
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
  @Input() post: Post | undefined;
  reel: Reel | undefined;
  constructor(private httpClient: HttpClient) {}

  liked = false;

  handleLike() {
    this.liked = !this.liked;
  }

  viewCommentsParent = false;
  toggleComments() {
    this.viewCommentsParent = !this.viewCommentsParent;
  }

  ngOnInit(): void {
    this.reel = this.post?.reel;
  }

  songUrl = 'https://api.spotify.com/v1/me/player/currently-playing';
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', ' ');
  //https://v2.angular.io/docs/ts/latest/guide/server-communication.html#:~:text=The%20Angular%20Http%20client%20communicates%20with%20the%20server,family%20of%20services%20in%20the%20Angular%20HTTP%20library.
  getSong() {
    var element = document.getElementById('spotifyTest');
    if (element != null) {
      //silly button to get the response from spotify to print out, for some reason console.log was giving me problems
      element.innerHTML = JSON.stringify(
        this.httpClient.get(this.songUrl, { headers: this.headers })
      );
    }
    //return this.httpClient.request('GET', this.songUrl + '?' + 'name=term', {'headers': this.headers, responseType:'json'});
    //return this.httpClient.get(this.songUrl).map(this.extractData).catch(this.handleError);
  }

  //https://developer.spotify.com/documentation/web-api/reference/#/operations/get-the-users-currently-playing-track
  private extractData(res: Response | any) {
    let body = res.json();
    return body.getItem().getName() || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = /*body.error || */ JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    //return Observable.throw(errMsg);
  }
}
