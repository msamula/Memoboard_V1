import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

import { LoginComponent } from './login.component';
import {HttpMemoService} from "../services/http-memo.service";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,

    //enables two-way-binding by angular
    FormsModule
  ],
  providers: [
    HttpMemoService
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
