import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MemoModule} from "./memo/memo.module";
import {MemoService} from "./services/memo.service";
import {HttpMemoService} from "./services/http-memo.service";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    //enables two-way-binding by angular
    FormsModule,

    //bootstrap
    NgbModule,

    //import the MemoModule
    MemoModule,

    //httpClient for http-memo.service und providers
    HttpClientModule
  ],
  //add services here under providers
  providers: [
    MemoService,
    HttpMemoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
