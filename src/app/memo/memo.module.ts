import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoListComponent } from './memo-list/memo-list.component';
import { MemoDetailComponent } from './memo-detail/memo-detail.component';
import {CdkDrag} from "@angular/cdk/drag-drop";



@NgModule({

  declarations: [
    MemoListComponent,
    MemoDetailComponent
  ],

  imports: [
    CommonModule,
    CdkDrag
  ],

  //add exports with MemoComponent when creating this module
  //import MemoModule in app.module.ts
  //create grid-tag <app-memo> in app.component.html
  exports: [
    MemoListComponent,
    MemoDetailComponent
  ]

})

export class MemoModule { }
