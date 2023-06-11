import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

//bootstrap
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

// modules and components
import { AppComponent } from './app.component';
import {MemoModule} from "./memo/memo.module";

// services for providers
import {HttpMemoService} from "./services/http-memo.service";
import {SignalService} from "./services/signal.service";
import {CdkDrag} from "@angular/cdk/drag-drop";



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
