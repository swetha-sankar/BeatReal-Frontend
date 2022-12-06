import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    console.log('sessionStorage stuffs', sessionStorage.getItem("access_token"));
  }

  // artistID="https://api.spotify.com/vi/search";
  headers= new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', ' ');


  //Search

  async search() {
    //GET request using search to get the Artist ID
    let artistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
      }
    }

    let artistID = await fetch("https://api.spotify.com/v1/search?q=" + 'Taylor Swift' + '&type=artist', artistParameters)
    .then(response => response.json()).then(data => console.log(data));
  }

}
