import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import {HubConnectionState} from "@microsoft/signalr";

const hubURL = 'https://localhost:7296/memohub';

@Injectable({
  providedIn: 'root'
})
export class SignalService {

  connection: any;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubURL)
      .build();

    this.connection.on("ReceiveMemo",function (user: string, message: string){
      console.log(user + " " + message);
    });
  }

  CreateMemo(username: string, message: string){

    if(this.connection.state === HubConnectionState.Disconnected){

    this.connection.start()
      .then(()=>{
        this.connection.invoke("SendMemo", username, message);
        });
      }

    if(this.connection.state === HubConnectionState.Connected) {

      this.connection.invoke("SendMemo", username, message);
    }
  }
}
