import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  username: string;

  constructor() {
    this.username = 'Micha';
  }

  SetUsername(input: string){
    this.username = input;
  }

  GetUsername(){
    return this.username;
  }

}
