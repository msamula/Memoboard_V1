import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {HttpMemoService} from "../services/http-memo.service";
import {HttpErrorResponse} from "@angular/common/http";
import {SharedService} from "../services/shared.service";


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

  loginTitle: string;

  hideLogin: boolean;
  hideBackground: boolean;
  animateClosing: boolean;
  animateClosedBG: boolean;

  alertMessage: string;
  animateAlert: boolean;

  createUser: boolean;
  confirmCreate: boolean;
  created: boolean;

  disableSubmit: boolean;

  private _username: string = "";
  private _password: string = "";
  private _confirmPassword: string = "";


  get username(): string {
    (this._password.trim().length < 4 || this._username.trim().length < 3) ? this.disableSubmit = true : this.disableSubmit = false;
    return this._username;
  }

  set username(value: string) {
    this._username = value.trim();
  }
  get password(): string {
    (this._password.trim().length < 4 || this._username.trim().length < 3) ? this.disableSubmit = true : this.disableSubmit = false;
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get confirmPassword(): string {
    (this._password.trim().length < 4 || this._username.trim().length < 3 || this._password !== this._confirmPassword) ? this.confirmCreate = true : this.confirmCreate = false;
    return this._confirmPassword;
  }

  set confirmPassword(value: string) {
    this._confirmPassword = value;
  }

  constructor(private httpMemoService: HttpMemoService, private sharedService: SharedService) {
    this.loginTitle = `<i class="bi bi-person-circle"></i> Sign in`;
    this.hideLogin = false;
    this.hideBackground = false;
    this.disableSubmit = false;
    this.animateClosing = false;
    this.animateClosedBG = false;
    this.animateAlert = false;
    this.alertMessage = "";
    this.createUser = false;
    this.confirmCreate = true;
    this.created = false;
  }

  onSubmit(thisForm: NgForm) {
    this.httpMemoService.VerifyUser(thisForm.value).subscribe(

      (data:any)=>{
              this.httpMemoService.SetTokenHeader(data.body);
              this.sharedService.SetUsername(this._username);
              this.closeLogin();
            },

      (e: HttpErrorResponse) => {
            if(e.status === 401){
                this.animateAlert = !this.animateAlert;
                this.alertMessage = `<i class="bi bi-exclamation-triangle-fill"></i> Wrong password. Please try again.`;
            }

            if(e.status === 404){
              this.animateAlert = !this.animateAlert;
              this.alertMessage = `<i class="bi bi-exclamation-triangle-fill"></i> The user does not exist. Please try again.`;
            }

            this.ClearInput();

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

  ShowRegistration() {
    this.createUser = !this.createUser;
    this.loginTitle == `<i class="bi bi-person-circle"></i> Sign up`
      ? this.loginTitle = `<i class="bi bi-person-circle"></i> Sign in`
      : this.loginTitle = `<i class="bi bi-person-circle"></i> Sign up`;

    this.ClearInput();
  }

  RegisterUser(thisForm: NgForm) {

    this.httpMemoService.RegisterUser(thisForm.value).subscribe(
      () =>{
        this.ClearInput();
        this.ShowRegistration();
        this.created = !this.created;

        setTimeout(async () => {
          this.created = !this.created;
        }, 5000);
      },
      (e: HttpErrorResponse) => {

              if (e.status === 422) {
                this.animateAlert = !this.animateAlert;
                this.alertMessage = `<i class="bi bi-exclamation-triangle-fill"></i> The user already exists. Please choose another username.`;
              }

              setTimeout(async () => {
                this.animateAlert = !this.animateAlert;
              }, 5000);
            }
    );
  }

  ClearInput(){
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
