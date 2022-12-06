import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl(null, [Validators.required])
  })

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    console.log('sessionStorage stuffs', sessionStorage.getItem("access_token"));
  }

  test() {
    console.log('test');
  }

  async postCurrent() {
    console.log('postCurrent');
    // GET request for currently playing song using spotify api
    let songParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
      }
    }

    let songID = await fetch("https://api.spotify.com/v1/me/player/currently-playing", songParameters)
    .then(response => response.json()).then(data =>{ return data.item.id });

    // POST request to our api to post song; takes in posterName and songID
    let username: string = sessionStorage.getItem('username')!;
    let params = {
      method: 'PATCH',
      headers: {
        'posterName': username,
        'songId': songID
      }
    }
    let patchCurrent = await fetch("http://localhost:3000/api/insertReel", params)

  }

  /*
  //Search
  async search() {
    //GET request using search to get the song ID
    let songParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
      }
    }

    let songID = await fetch("https://api.spotify.com/v1/search?q=" + this.searchForm.value.search + '&type=track,artist', songParameters)
    .then(response => response.json()).then(data => console.log(data));
  }
  */

}
