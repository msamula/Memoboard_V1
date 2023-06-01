import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MemoModule} from "./memo/memo.module";
import {MemoService} from "./services/memo.service";


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
    MemoModule
  ],
  //add services here under providers
  providers: [
    MemoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
