import {
  Component,
  OnInit,
  Injectable,
  Input,
  Directive,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { Post } from 'src/types/post';
import { Reel } from 'src/types/reel';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: 'iframe',
})
export class CachedSrcDirective {
  @Input()
  public get cachedSrc(): string {
    return this.elRef.nativeElement.src;
  }
  public set cachedSrc(src: string) {
    const newSrc = `https://open.spotify.com/embed/track/${src}?utm_source=generator`;
    if (this.elRef.nativeElement.src !== newSrc) {
      console.log(newSrc, 'BLAAAAH');
      this.renderer.setAttribute(this.elRef.nativeElement, 'src', newSrc);
    }
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.elRef.nativeElement.src = '';
  }
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
@Injectable()
export class PostComponent implements OnInit {
  @Input() post: Post;
  reel: Reel | undefined;
  constructor(private sanitizer: DomSanitizer) {
    this.post = {
      username: '',
      reel: {
        songId: '',
        reelId: '',
        posterName: '',
        date: new Date(),
        likes: [],
        comments: [],
      },
      profilePic: '',
    };
  }

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

  // getSpotify(songId: string): SafeUrl {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(
  //     `https://open.spotify.com/embed/track/${songId}?utm_source=generator`
  //   );
  // }
}
