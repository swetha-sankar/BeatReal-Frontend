import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  readonly ROOT_URL: string;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/api/${uri}`);
  }

  //post, patch, delete should be done here
}
