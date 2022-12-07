import { WebRequestService } from '../web-request.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BRComment, Reel } from 'src/types/types';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Output() viewCommentsEvent = new EventEmitter();
  @Input() reel: Reel | undefined;
  constructor(private WebReqService: WebRequestService) {}

  defaultImg = '../../assets/emptyProfPic.png';
  comments: BRComment[] = [];

  commentForm = new FormGroup({
    textContent: new FormControl('', [Validators.required]),
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
        posterName: this.reel?.posterName,
        reelId: this.reel!.reelId,
      }).subscribe(() => {
        //This is just for display, the backend gets updated too but this is just to not force
        //a refresh
        this.comments!.push({
          commentId: 'ajdsfh',
          commenterName: sessionStorage.getItem('username')!,
          textContent: this.commentForm.get('textContent')!.getRawValue(),
        });
        this.commentForm.value.textContent = '';
      });
    }
  }

  getComments() {
    this.comments = this.reel!.comments;
  }

  ngOnInit(): void {
    this.getComments();
  }
}
