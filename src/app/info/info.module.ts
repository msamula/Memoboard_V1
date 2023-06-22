import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info.component';
import {FormsModule} from "@angular/forms";
import {CdkDrag} from "@angular/cdk/drag-drop";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";



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
        CdkDrag,
        NgbDatepickerModule
    ]
})
export class InfoModule { }
