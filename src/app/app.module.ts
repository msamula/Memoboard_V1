import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";

//bootstrap
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

// modules and components
import {AppComponent} from './app.component';
import {MemoModule} from "./memo/memo.module";
import {LoginModule} from "./login/login.module";

// services for providers
import {HttpMemoService} from "./services/http-memo.service";
import {SignalService} from "./services/signal.service";
import {InfoModule} from "./info/info.module";

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,

    //animations
    BrowserAnimationsModule,

    //httpClient for http-memo.service
    HttpClientModule,

    //bootstrap
    NgbModule,

    //for memo-list.component.html file -> drag and drop
    CdkDrag,
    CdkDropList,

    //import the MemoModule
    MemoModule,
    LoginModule,
    InfoModule
  ],

  //add services here under providers
  providers: [
    HttpMemoService,
    SignalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
