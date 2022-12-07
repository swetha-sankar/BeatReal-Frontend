import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';
import * as internal from 'stream';
import { WebRequestService } from '../web-request.service';
import { Post } from 'src/types/post';

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

  constructor(
    public dialog: MatDialog,
    private router: ActivatedRoute,
    private WebReqService: WebRequestService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('I CHANGED');
  }

  openDialog() {
    console.log('dialog open');
    this.dialog.open(DialogComponent);
  }
  posts: Post[] = [];
  postTmp: Post | undefined;
  ngOnInit(): void {
    this.getPosts();
    this.router.queryParams.subscribe((params: any) => {
      if (!params['access_token']) {
        return;
      }
      this.access_token = params['access_token'];
      console.log('access_token:', this.access_token);
      this.token_type = params['token_type'];
      this.scope = params['scope'];
      this.expires_in = params['expires_in'];
      this.refresh_token = params['refresh_token'];
      localStorage.setItem('access_token', this.access_token);
      localStorage.setItem('token_type', this.token_type);
      localStorage.setItem('scope', this.scope);
      localStorage.setItem('expires_in', this.expires_in.toString());
      localStorage.setItem('refresh_token', this.refresh_token);
    });
  }

  route = 'feed';

  postReel = () => {
    alert('postReel was called');
  };

  getPosts() {
    this.WebReqService.get(
      `users/${localStorage.getItem('username')}/feed`
    ).subscribe((res: any) => {
      this.posts = res.result;
    });
  }
}
