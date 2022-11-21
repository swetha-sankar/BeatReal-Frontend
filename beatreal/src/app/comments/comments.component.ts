import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Output() viewCommentsEvent = new EventEmitter();
  constructor() {}

  commentObj = {
    img: '../../assets/emptyProfPic.png',
    username: 'user5678355',
    textContent: 'Hello',
  };
  commentObj2 = {
    img: '../../assets/emptyProfPic.png',
    username: 'user123987',
    textContent:
      'adilsfjaljdshflakudshfluahdsfluhasdfkjadsfhlkjadshfluhasdflujahsdkljfnalsjdflajdfskajdshfkjhasdjkfhaskjdfhajksdfhkajdgshfkahgsdbfkjadgshfkjhaskdjghaksgfalsudjfhakdfhkadfshjh',
  };
  commentObj3 = {
    img: '../../assets/emptyProfPic.png',
    username: 'user89273',
    textContent:
      'overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflow overflowwwwww overflow',
  };
  comments = [
    this.commentObj,
    this.commentObj,
    this.commentObj,
    this.commentObj2,
    this.commentObj3,
    this.commentObj,
  ];

  toggleComments() {
    this.viewCommentsEvent.emit();
  }

  ngOnInit(): void {}
}
