import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoComponent } from './memo.component';



@NgModule({

  declarations: [
    MemoComponent
  ],

  imports: [
    CommonModule
  ],

  //add exports with MemoComponent when creating this module
  //import MemoModule in app.module.ts
  //create grid-tag <app-memo> in app.component.html
  exports: [
    MemoComponent
  ]

})

export class MemoModule { }
