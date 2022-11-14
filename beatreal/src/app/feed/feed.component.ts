import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  route = 'feed';

  posts = [1, 2, 3, 4];

  postReel = () => {
    alert('postReel was called');
  };
}
