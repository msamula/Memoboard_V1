import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info.component';
import {FormsModule} from "@angular/forms";
import {CdkDrag} from "@angular/cdk/drag-drop";



@NgModule({
    declarations: [
        InfoComponent
    ],
    exports: [
        InfoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        CdkDrag
    ]
})
export class InfoModule { }
