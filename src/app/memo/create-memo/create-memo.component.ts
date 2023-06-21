import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SignalService} from "../../services/signal.service";
import {HttpMemoService} from "../../services/http-memo.service";
import {HubConnectionState} from "@microsoft/signalr";
import {HttpErrorResponse} from "@angular/common/http";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-create-memo',
  templateUrl: './create-memo.component.html',
  styleUrls: ['./create-memo.component.css']
})

export class CreateMemoComponent implements OnInit{

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
  messageDisabled: boolean;

  constructor(private httpMemoService: HttpMemoService, private signalService: SignalService, private sharedService: SharedService) {

    this.conStatus =`<i class="bi bi-wifi-1"></i> ${this.signalService.connection.state}`;
    this.conColor = 'background: #ffc107;';
    this.btnDisabled = true;
    this.usernameDisabled = true;
    this.messageDisabled = false;

    this.ShowSignalRStatus();
  }

  ngOnInit(): void {
    this._username = this.sharedService.GetUsername();
  }

  @Output()
  cancel: EventEmitter<any> = new EventEmitter();

  OnCancel(){
    this.cancel.emit();
  }

  async BtnCreateMemo() {
    this._username = this._username.trim();
    this._message = this._message.trim();

    try
    {
      this.httpMemoService.CreateMemo(this._username, this._message).subscribe(
        ()=>{},
        (e: HttpErrorResponse) => {
          if(e.status === 429){

            this.messageDisabled = true;

            setTimeout( ()=>{
              this.messageDisabled = false;
            },14999);

            window.alert(`HttpResponseStatusCode: ${e.status}\nYou can't create more than 5 memos in 15 seconds.`);
          }
        })
        .add(()=>{
          this.signalService.UpdateMemoboard();
          //this.usernameDisabled = true;
          this._message = "";
        });
    }
    catch
    {
      window.alert('Something went wrong while creating a new memo.');
    }
  }

  ShowSignalRStatus(){

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
        this.conColor = 'background: #dc3545;';
        this.btnDisabled = true;

        this.signalService.UpdateMemoboard();       //-> UpdateMemoboard() automatically trying to reconnect
      }

    },2000);
  }
}
