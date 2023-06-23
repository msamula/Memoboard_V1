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

  /*shows 'Sign up' or 'Sign in'*/
  windowTitle: string;

  /*for login animation*/
  hideLogin: boolean;
  hideBackground: boolean;
  animateClosingLogin: boolean;
  animateClosedBackground: boolean;

  /*for alerts*/
  alertMessage: string;
  animateAlert: boolean;

  /*Register new user*/
  showRegistration: boolean;
  registerButtonDisabled: boolean;
  userCreatedInfo: boolean;

  /*Password checker regular expressions*/
  passwordChecker: RegExp;

  /*Login button*/
  disableSubmit: boolean;

  /*Input fields START*/
  private _username: string = "";
  private _password: string = "";
  private _confirmPassword: string = "";


  get username(): string {
    (this.passwordChecker.test(this._password) && this._username.trim().length >= 3) ? this.disableSubmit = false : this.disableSubmit = true;
    return this._username;
  }

  set username(value: string) {
    this._username = value.trim();
    this.PasswordChecker(this._username, this._password);
  }
  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
    this.PasswordChecker(this._username, this._password);
  }

  get confirmPassword(): string {
    return this._confirmPassword;
  }

  set confirmPassword(value: string) {
    this._confirmPassword = value;
    this.PasswordChecker(this._username, this._confirmPassword);
  }

  /*Input fields END*/

  constructor(private httpMemoService: HttpMemoService, private sharedService: SharedService) {
    this.windowTitle = `<i class="bi bi-person-circle"></i> Sign in`;

    this.hideLogin = false;
    this.hideBackground = false;
    this.animateClosingLogin = false;
    this.animateClosedBackground = false;

    this.animateAlert = false;
    this.alertMessage = "";

    this.showRegistration = false;
    this.registerButtonDisabled = true;
    this.userCreatedInfo = false;

    this.disableSubmit = true;

    // password has at least one lowercase letter (?=.*[a-z])
    // password has at least one uppercase letter (?=.*[A-Z])
    // password has at least one digit (?=.*[0-9])
    // password has at least one special character (?=.*[^A-Za-z0-9])
    // password is at least eight characters long(?=.{8,})
    this.passwordChecker = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
  }

  VerifyUser(thisForm: NgForm) {
    this.httpMemoService.VerifyUser(thisForm.value).subscribe(

      (data:any)=>{
              this.httpMemoService.SetTokenHeader(data.body);
              this.sharedService.SetUsername(this._username);
              this.CloseLogin();
            },

      (e: HttpErrorResponse) => {
            if(e.status === 401){
              this.ShowAlert('Wrong password. Please try again.');
            }

            if(e.status === 404){
              this.ShowAlert('The user does not exist. Please try again.');
            }

            this.ClearInput();
      }
    );
  }

  RegisterUser(thisForm: NgForm) {
    this.httpMemoService.RegisterUser(thisForm.value).subscribe(
      () =>{

        this.ClearInput();
        this.ShowOrHideRegistration();

        this.userCreatedInfo = !this.userCreatedInfo;
        setTimeout(async () => {
          this.userCreatedInfo = !this.userCreatedInfo;
        }, 5000);
      },
      (e: HttpErrorResponse) => {

        if (e.status === 422) {
          this.ShowAlert('The user already exists. Please choose another username.');
        }
      }
    );
  }

  CloseLogin() {
    this.animateClosingLogin = true;

    setTimeout(async ()=>{
      this.hideLogin = true;
      this.animateClosedBackground = true;
    },200);

    setTimeout(async ()=>{
      this.hideBackground = true;
    },600);
  }

  ShowOrHideRegistration() {
    this.showRegistration = !this.showRegistration;
    this.windowTitle == `<i class="bi bi-person-circle"></i> Sign up`
      ? this.windowTitle = `<i class="bi bi-person-circle"></i> Sign in`
      : this.windowTitle = `<i class="bi bi-person-circle"></i> Sign up`;

    this.ClearInput();
  }

  ShowAlert(alertMessage: string){
    this.animateAlert = !this.animateAlert;
    this.alertMessage = `<i class="bi bi-exclamation-triangle-fill"></i> ${alertMessage}`;

    setTimeout(async ()=>{
      this.animateAlert = !this.animateAlert;
    },5000);
  }

  ClearInput(){
    this._username = '';
    this._password = '';
    this._confirmPassword = '';
  }

  PasswordChecker(username: string ,password: string) {

    if(this.passwordChecker.test(password) && (this._password === this._confirmPassword) && username.length >= 3) {
      this.registerButtonDisabled = false;
    }
    if(!this.passwordChecker.test(password) || (this._password !== this._confirmPassword) || username.length < 3) {
      this.registerButtonDisabled = true;
    }
  }
}
