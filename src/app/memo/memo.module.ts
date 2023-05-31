import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoListComponent } from './memo-list/memo-list.component';
import {CdkDrag} from "@angular/cdk/drag-drop";



@NgModule({

  declarations: [
    MemoListComponent,
  ],

  imports: [
    CommonModule,
    CdkDrag
  ],

  //add exports with MemoComponent when creating this module
  //import MemoModule in app.module.ts
  //create grid-tag <app-memo> in app.component.html
  exports: [
    MemoListComponent
  ]

})

export class MemoModule { }
