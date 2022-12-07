import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';
import * as internal from 'stream';
import { WebRequestService } from '../web-request.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  access_token!: string;
  token_type!: string;
  scope!: string;
  expires_in!: number;
  refresh_token!: string;
  username: string = '';
  constructor(public dialog: MatDialog, private router: ActivatedRoute, private WebReqService: WebRequestService) {
    this.username = sessionStorage.getItem('username')!;
  }

  openDialog() {
    console.log("dialog open");
    this.dialog.open(DialogComponent);
  }
  

  ngOnInit(): void {
    
    this.router.queryParams.subscribe(params => {
      this.access_token = params['access_token'];
      console.log('access_token:', this.access_token);
      this.token_type = params['token_type'];
      this.scope = params['scope'];
      this.expires_in = params['expires_in'];
      this.refresh_token = params['refresh_token'];
      sessionStorage.setItem("access_token", this.access_token);
      sessionStorage.setItem('token_type', this.token_type);
      sessionStorage.setItem('scope', this.scope);
      sessionStorage.setItem('expires_in', this.expires_in.toString());
      sessionStorage.setItem('refresh_token', this.refresh_token);
    })

    this.getUser();

  }
  
  route = 'feed';

  
  posts: any;
  //http://localhost:3000/api/users/:username/feed
  getUser() {
    this.WebReqService.get(`users/${this.username}/feed`).subscribe((res: any) => {
      this.posts = res.result;
    });
    console.log(this.posts);
  }
  

  //posts = [1, 2, 3];
  

  postReel = () => {
    alert('postReel was called');
  };

}
