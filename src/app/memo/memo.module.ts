//standard imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//user imports
import { MemoListComponent } from './memo-list/memo-list.component';
import {CdkDrag} from "@angular/cdk/drag-drop";

// module has no logic inside
// it's like a 'tree'/'root'

@NgModule({

  declarations: [
    MemoListComponent,
  ],

  imports: [
    CommonModule,
    CdkDrag             //for memo-list.component.html file -> drag and drop
  ],

  //add exports with MemoComponent when creating this module!
  //import MemoModule in app.module.ts
  //create grid-tag <app-memo> in app.component.html
  exports: [
    MemoListComponent
  ]

})

export class MemoModule { }
