import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  /* This is a global service component that you call from other components
   * to run requests
   */
  readonly ROOT_URL: string;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/api/${uri}`);
  }

  post(uri: string, body: Object) {
    return this.http.post(`${this.ROOT_URL}/api/${uri}`, body);
  }

  patch(uri: string, body: Object) {
    return this.http.patch(`${this.ROOT_URL}/api/${uri}`, body);
  }

  put(uri: string, body: Object) {
    return this.http.put(`${this.ROOT_URL}/api/${uri}`, body);
  }

  //delete should be done here also
}
