import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
data: any;

  constructor() { }

  ngOnInit(): void {
  }

  // artistID="https://api.spotify.com/vi/search";
  // headers= new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', ' ');


  //Search
  async search() {
    //GET request using search to get the Artist ID
    var artistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    var artistID = await fetch("https://api.spotify.com/vi/search", artistParameters);
  }

}
