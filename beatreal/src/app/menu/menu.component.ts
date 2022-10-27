import { Component, OnInit, Input } from '@angular/core';
import { TestService } from '../test.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  constructor(public sharedSvc:TestService) { }
  @Input() activeClass = 'active';
  ngOnInit(): void {}
  
}
