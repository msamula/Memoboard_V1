import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

//bootstrap
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

// modules and components
import { AppComponent } from './app.component';
import {MemoModule} from "./memo/memo.module";

// services for providers
import {HttpMemoService} from "./services/http-memo.service";
import {SignalService} from "./services/signal.service";



@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,

    //httpClient for http-memo.service
    HttpClientModule,

    //bootstrap
    NgbModule,

    //import the MemoModule
    MemoModule
  ],

  //add services here under providers
  providers: [
    HttpMemoService,
    SignalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
