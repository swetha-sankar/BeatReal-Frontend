import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WebRequestService } from '../web-request.service';
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

  constructor(private httpClient: HttpClient, private WebReqService: WebRequestService ) { }

  ngOnInit(): void {
    console.log('localStorage stuffs', localStorage.getItem("access_token"));
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
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    }

    let songID = await fetch("https://api.spotify.com/v1/me/player/currently-playing", songParameters)
    .then(response => response.json())
    .then(data =>{ return data.item.id });

    
    // POST request to our api to post song; takes in posterName and songID
    let username: string = localStorage.getItem('username')!;
    this.WebReqService.patch('insertReel', {
      posterName: username,
      songId: songID
    }).subscribe(() => {
      console.log("insertedReel");
    });

    window.location.reload();

  }

  /*
  //Search
  async search() {
    //GET request using search to get the song ID
    let songParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    }

    let songID = await fetch("https://api.spotify.com/v1/search?q=" + this.searchForm.value.search + '&type=track,artist', songParameters)
    .then(response => response.json()).then(data => console.log(data));
  }
  */

}
