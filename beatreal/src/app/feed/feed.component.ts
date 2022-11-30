import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    console.log("dialog open");
    this.dialog.open(DialogComponent);
  }

  ngOnInit(): void {}

  route = 'feed';

  posts = [1, 2];

  postReel = () => {
    alert('postReel was called');
  };
}
