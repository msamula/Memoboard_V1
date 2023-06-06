import { Component } from '@angular/core';
import {SignalService} from "../../services/signal.service";
import {HttpMemoService} from "../../services/http-memo.service";
import {HubConnectionState} from "@microsoft/signalr";

@Component({
  selector: 'app-create-memo',
  templateUrl: './create-memo.component.html',
  styleUrls: ['./create-memo.component.css']
})

export class CreateMemoComponent {

  private _username: string = '';
  private _message: string = '';

  get username(): string {

    (this._message.trim().length < 1 || this._username.trim().length < 1) ? this.btnDisabled = true : this.btnDisabled = false;

    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get message(): string {

    (this._message.trim().length < 1 || this._username.trim().length < 1) ? this.btnDisabled = true : this.btnDisabled = false;

    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }


  conStatus: string;
  conColor: string;
  btnDisabled: boolean;
  usernameDisabled: boolean;



  constructor(private httpMemoService: HttpMemoService, private signalService: SignalService) {
    this.conStatus =`<i class="bi bi-wifi-1"></i> ${this.signalService.connection.state}`;
    this.conColor = 'background: #ffc107;';
    this.btnDisabled = true;
    this.usernameDisabled = false;


    this.GetSignalRStatus();
  }

  CreateMemo() {
    this._username = this._username.trim();
    this._message = this._message.trim();

    try
    {
      this.httpMemoService.CreateMemo(this._username, this._message).subscribe();
      this.signalService.UpdateMemoboard();
      this.usernameDisabled = true;
      this._message = "";
    }
    catch
    {
      window.alert('Something went wrong while creating a new memo.');
    }
  }

  GetSignalRStatus(){

    setInterval(async ()=>{

      if(this.signalService.connection.state === HubConnectionState.Connected)
      {
        this.conStatus =`<i class="bi bi-wifi"></i> ${this.signalService.connection.state}`;
        this.conColor = 'background: #198754;';
        this.btnDisabled = false;
      }


      if((this.signalService.connection.state === HubConnectionState.Connecting) || (this.signalService.connection.state === HubConnectionState.Reconnecting))
      {
        this.conStatus =`<i class="bi bi-wifi-1"></i> ${this.signalService.connection.state}`;
        this.conColor = 'background: #ffc107;';
        this.btnDisabled = true;
      }


      if(this.signalService.connection.state === HubConnectionState.Disconnected)
      {
        this.conStatus =`<i class="bi bi-wifi-off"></i> ${this.signalService.connection.state}`;
        this.signalService.TryReconnect();
        this.conColor = 'background: #dc3545;';
        this.btnDisabled = true;
      }

    },2000);
  }
}
