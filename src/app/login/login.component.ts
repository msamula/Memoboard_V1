import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {HttpMemoService} from "../services/http-memo.service";
import {HttpErrorResponse} from "@angular/common/http";


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
        style({ transform: 'translateY(-150%)'})),

      transition('start <=> closed', [
        animate('0.2s')
      ])
    ]),

    trigger('closeBackground', [

      state('start',
        style({
          // normal style
        })),

      state('closed',
        style({ opacity: 0 })),

      transition('start <=> closed', [
        animate('0.4s')
      ])
    ])
  ]
})
export class LoginComponent {

  hideLogin: boolean;
  hideBackground: boolean;
  animateClosing: boolean;
  animateClosedBG: boolean;

  alertMessage: string;
  animateAlert: boolean;

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
    this.hideBackground = false;
    this.disableSubmit = false;
    this.animateClosing = false;
    this.animateClosedBG = false;
    this.animateAlert = false;
    this.alertMessage = "";
  }

  onSubmit(thisForm: NgForm) {
    this.httpMemoService.VerifyUser(thisForm.value).subscribe(

      (data:any)=>{
              this.httpMemoService.SetTokenHeader(data);
              this.closeLogin();
            },

      (e: HttpErrorResponse) => {
            if(e.status === 401){
                this.animateAlert = !this.animateAlert;
                this.alertMessage = `<i class="bi bi-exclamation-triangle-fill"></i> [${e.status}] Wrong password. Please try again.`;
            }

            if(e.status === 404){
              this.animateAlert = !this.animateAlert;
              this.alertMessage = `<i class="bi bi-exclamation-triangle-fill"></i> [${e.status}] Wrong username. Please try again.`;
            }

            setTimeout(async ()=>{
              this.animateAlert = !this.animateAlert;
            },5000);
      }
    );
  }

  closeLogin() {
    this.animateClosing = true;
    setTimeout(async ()=>{
      this.hideLogin = true;
      this.animateClosedBG = true;
    },200);
    setTimeout(async ()=>{
      this.hideBackground = true;
    },600);
  }
}
