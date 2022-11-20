import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Output() viewCommentsEvent = new EventEmitter();
  constructor() {}

  commentObj = { userId: 55, textContent: 'Hello' };
  comments = [this.commentObj];

  toggleComments() {
    this.viewCommentsEvent.emit();
  }

  ngOnInit(): void {}
}
