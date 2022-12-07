import { WebRequestService } from '../web-request.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BRComment } from 'src/types/types';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Output() viewCommentsEvent = new EventEmitter();
  constructor(private WebReqService: WebRequestService) {}

  defaultImg = '../../assets/emptyProfPic.png';
  comments: BRComment[] = [
    {
      commentId: 'as;dkljf;alskdfla',
      commenterName: 'aidant',
      textContent: 'hiya there!',
    },
    {
      commentId: 'as;dkljf;alskdfla',
      commenterName: 'CRULL',
      textContent: 'hiya there!',
    },
    {
      commentId: 'as;dkljf;alskdfla',
      commenterName: 'I AM CRULL',
      textContent: 'hiya there!',
    },
    {
      commentId: 'as;dkljf;alskdfla',
      commenterName: 'aidant',
      textContent: 'hiya there!',
    },
    {
      commentId: 'as;dkljf;alskdfla',
      commenterName: 'aidant',
      textContent: 'hiya there!',
    },
    {
      commentId: 'as;dkljf;alskdfla',
      commenterName: 'aidant',
      textContent: 'hiya there!',
    },
    {
      commentId: 'as;dkljf;alskdfla',
      commenterName: 'aidant',
      textContent: 'hiya there!',
    },
    {
      commentId: 'as;dkljf;alskdfla',
      commenterName: 'aidant',
      textContent: 'hiya there!',
    },
    {
      commentId: 'as;dkljf;alskdfla',
      commenterName: 'aidant',
      textContent: 'hiya there!',
    },
    {
      commentId: 'as;dkljf;alskdfla',
      commenterName: 'aidant',
      textContent: 'hiya there!',
    },
  ];
  Reel: any;

  commentForm = new FormGroup({
    textContent: new FormControl(null, [Validators.required]),
  });

  toggleComments() {
    this.viewCommentsEvent.emit();
  }
  writeComment() {
    if (!this.commentForm.valid) {
      alert('Please type a comment');
    } else {
      this.WebReqService.patch('commentReel', {
        commenterName: sessionStorage.getItem('username'),
        textContent: this.commentForm.get('textContent')!.getRawValue(),
        posterName: sessionStorage.getItem('username'),
      }).subscribe(() => {
        this.getComments();
      });
    }
  }

  getComments() {
    this.WebReqService.get(
      `users/${sessionStorage.getItem('username')}/reels`
    ).subscribe((res: any) => {
      this.Reel = res.result.filter((reel: any) => reel._id == '');
      this.comments = this.Reel[0].comments;
    });
  }

  ngOnInit(): void {
    this.getComments();
  }
}
