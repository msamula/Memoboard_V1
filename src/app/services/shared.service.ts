import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  usernameIsSet: boolean;
  username: string;

  constructor() {
    this.username = '';
    this.usernameIsSet = false;
  }

  SetUsername(input: string){
    this.username = input;
    this.usernameIsSet = true;
  }

  GetUsername(){
    return this.username;
  }
}
