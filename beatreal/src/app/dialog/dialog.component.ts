import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';


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


  //Search
  async search() {
    //GET request using search to get the Artist ID
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

}
