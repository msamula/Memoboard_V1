import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {HttpMemoService} from "../services/http-memo.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('closeLogin', [

      state('start',
        style({
          // normal style
        })),

      state('closed',
        style({ transform: 'translateY(-150%)' })),

      transition('start <=> closed', [
        animate('0.2s')
      ])
    ])
  ]
})
export class LoginComponent {

  hideLogin: boolean;
  animateClosing: boolean;
  disableSubmit: boolean;


  private _username: string = "";
  private _password: string = "";


  get username(): string {
    (this._password.trim().length < 4 || this._username.trim().length < 3) ? this.disableSubmit = true : this.disableSubmit = false;
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
  get password(): string {
    (this._password.trim().length < 4 || this._username.trim().length < 3) ? this.disableSubmit = true : this.disableSubmit = false;
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  constructor(private httpMemoService: HttpMemoService) {
    this.hideLogin = false;
    this.disableSubmit = false;
    this.animateClosing = false;
  }

  onSubmit(thisForm: NgForm) {
    this.httpMemoService.VerifyUser(thisForm.value).subscribe((data:any)=>{
      this.httpMemoService.SetTokenHeader(data);
    });

    this.closeLogin();
  }

  closeLogin() {
    this.animateClosing = true;
    setTimeout(async ()=>{
      this.hideLogin = true;
    },500);
  }
}
