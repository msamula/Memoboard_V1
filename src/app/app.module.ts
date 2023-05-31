import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import {CdkDrag} from "@angular/cdk/drag-drop";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {GridModule} from "./grid/grid.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CdkDrag,
    NgbModule,
    GridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
