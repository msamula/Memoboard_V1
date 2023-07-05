import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SignalService} from "../../services/signal.service";
import {HttpMemoService} from "../../services/http-memo.service";
import {HttpErrorResponse} from "@angular/common/http";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-create-memo',
  templateUrl: './create-memo.component.html',
  styleUrls: ['./create-memo.component.css']
})

export class CreateMemoComponent implements OnInit{

  private _message: string = '';

  get message(): string {

    (this._message.trim().length < 1) ? this.btnDisabled = true : this.btnDisabled = false;

    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  username: string;
  showEmojis: boolean;
  btnDisabled: boolean;
  usernameDisabled: boolean;
  messageDisabled: boolean;

  constructor(private httpMemoService: HttpMemoService, private signalService: SignalService, private sharedService: SharedService) {
    this.username = '';
    this.showEmojis = true;
    this.btnDisabled = true;
    this.usernameDisabled = true;
    this.messageDisabled = false;
  }

  ngOnInit(): void {
    this.username = this.sharedService.GetUsername();
  }

  @Output()
  cancel: EventEmitter<any> = new EventEmitter();

  OnCancel(){
    this.showEmojis = true;
    this.cancel.emit();
  }

  async BtnCreateMemo() {
    this._message = this._message.trim();

    try
    {
      this.httpMemoService.CreateMemo(this._message).subscribe(
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
          this._message = "";
        });
    }
    catch
    {
      window.alert('Something went wrong while creating a new memo.');
    }
  }

  showEmojiWindow() {
    this.showEmojis = !this.showEmojis;
  }

  AddEmoji(emoji: string) {
    this._message += emoji;
  }
}
