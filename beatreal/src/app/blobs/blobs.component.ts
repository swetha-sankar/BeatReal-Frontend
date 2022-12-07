import { literalMap } from '@angular/compiler';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  SimpleChanges,
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
  lavaHeight: number;
  constructor() {
    this.prevScrollY = window.pageYOffset;
    this.lavaHeight = 0;
  }
  ngOnInit(): void {
    this.myLava = document.getElementById('lavaid');
    this.lavaHeight = -this.myLava.offsetHeight * -0.3;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('I CHANGED');
  }

  @HostListener('window:wheel', ['$event'])
  scroll(event: WheelEvent) {
    // let scrollDist = 75;
    // if (event.deltaY < 0) {
    //   scrollDist *= -1;
    // }
    this.lavaHeight += event.deltaY * 0.2;
    if (this.lavaHeight < 0) {
      this.lavaHeight = 0;
    } else if (this.lavaHeight > this.myLava.offsetHeight * 0.635) {
      this.lavaHeight = this.myLava.offsetHeight * 0.635;
    }

    const px = '-' + this.lavaHeight + 'px';

    this.myLava.style.top = px;
  }
}
