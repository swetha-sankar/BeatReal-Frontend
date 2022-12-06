import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() route: String = '';
  username: string = '';
  constructor(private router: ActivatedRoute) {
    this.username = this.router.snapshot.params['username'];
  }

  ngOnInit(): void {}
}
