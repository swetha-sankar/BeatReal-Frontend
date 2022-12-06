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
  comments: BRComment[] = [];
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
        commenterId: '638bfc00855ff9480c112b71', //all Id's are from the database but are fixed for now
        postId: '638bae096bc622b0b538193a',
        textContent: this.commentForm.get('textContent')!.getRawValue(), //this is the only thing not fixed on a dummy value
        posterId: '638badeec1f073c30c2aa54b',
      }).subscribe(() => {
        this.getComments();
      });
    }
  }

  getComments() {
    this.WebReqService.get('users/638badeec1f073c30c2aa54b/reels').subscribe(
      (res: any) => {
        this.Reel = res.result.filter(
          (reel: any) => reel._id == '638bae096bc622b0b538193a'
        );
        this.comments = this.Reel[0].comments;
      }
    );
  }

  ngOnInit(): void {
    this.getComments();
  }
}
