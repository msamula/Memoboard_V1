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
      .withAutomaticReconnect()
      .build();

    this.connection.start();
  }

  UpdateMemoboard(){

    setTimeout(()=>{

      if(this.connection.state === HubConnectionState.Disconnected){

        this.connection.start()
          .then(()=>{
            this.connection.invoke("UpdateMemoboard");
          });
      }

      if(this.connection.state === HubConnectionState.Connected) {

        this.connection.invoke("UpdateMemoboard");
      }

    },100);
  }

   TryReconnect(){

        this.connection.start();

        setTimeout(()=>{
          if(this.connection.state === HubConnectionState.Connected){
            this.connection.invoke("UpdateMemoboard");
          }
        },200);
  }

}
