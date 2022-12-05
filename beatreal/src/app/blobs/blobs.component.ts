import { literalMap } from '@angular/compiler';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-blobs',
  templateUrl: './blobs.component.html',
  styleUrls: ['./blobs.component.css'],
})
export class BlobsComponent implements OnInit {
  myLava: any;
  prevScrollY: number;
  constructor() {
    this.prevScrollY = window.pageYOffset;
  }
  ngOnInit(): void {
    this.myLava = document.getElementById('lavaid');
  }

  @HostListener('window:scroll', []) onWindowScroll() {
    const currScroll = window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
    const scroll = currScroll - this.prevScrollY;
    if (scroll > 0) {
      if (this.myLava.style.top + )
    }
    const px = Math.round(
      window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
    );
    console.log(this.myLava.offsetHeight * 0.7);
    console.log(px);
    if (px > this.myLava.offsetHeight * 0.7) {
      return;
    }
    this.myLava.style.top =
      '-' +
      Math.round(
        window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0
      ) +
      'px';
  }
}
