import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  public sharedValue: number;
  constructor() { 
    this.sharedValue = 5;
  }
}
