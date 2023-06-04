import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

import {CdkDrag} from "@angular/cdk/drag-drop";

import { MemoListComponent } from './memo-list/memo-list.component';
import { CreateMemoComponent } from './create-memo/create-memo.component';


// module has no logic inside
// it's like a 'tree'/'root'

@NgModule({

  declarations: [
    MemoListComponent,
    CreateMemoComponent
  ],

  imports: [
    CommonModule,

    //enables two-way-binding by angular
    FormsModule,

    //for memo-list.component.html file -> drag and drop
    CdkDrag
  ],

  //add exports with MemoComponent when creating this module!
  //import MemoModule in app.module.ts
  //create grid-tag <app-memo> in app.component.html
  exports: [
    MemoListComponent,
    CreateMemoComponent
  ]

})

export class MemoModule { }
