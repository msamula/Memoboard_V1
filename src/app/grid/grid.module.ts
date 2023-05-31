import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';

@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    CommonModule
  ],

  //add exports with GridComponent when creating this module
  //import GridModule in app.module.ts
  //create grid-tag <app-grid> in app.component.html
  exports: [
      GridComponent
  ]
})

export class GridModule { }
