import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private router: ActivatedRoute) {}

  route = 'profile';
  username: string | undefined;
  ngOnInit(): void {
    console.log(this.router.snapshot.params);
    this.username = this.router.snapshot.params['username'];
  }
}
