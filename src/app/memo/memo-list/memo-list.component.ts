//standard imports
import {Component, EventEmitter, Input, Output} from '@angular/core';

//user imports
import {Memo} from "../../models/models";

//Decorator
@Component({
  selector: 'app-memo-list',                    //name of the tag in the app.component.html file
  templateUrl: './memo-list.component.html',    //html of the component
  styleUrls: ['./memo-list.component.css']      //list of css of the component
})


export class MemoListComponent
  {
    newMessage: string;
    condition: boolean;

    constructor() {
      this.newMessage = "";
      this.condition = false;
    }

    //inputMemo -> pass data down (memo from *ngFor="let memo of memos;" from app.component.ts)
    @Input()
    inputMemo!: Memo;

    //output -> pass data up with events
    @Output()
    remove: EventEmitter<any> = new EventEmitter();
    @Output()
    confirmChange: EventEmitter<any> = new EventEmitter();

    //emit -> fire up the event
    onRemove() {
      this.remove.emit(this.inputMemo);
    }

    onChange() {
      this.condition = !this.condition;
    }

    onConfirmChange() {
      this.inputMemo.message = this.newMessage;
      this.confirmChange.emit(this.inputMemo);
    }
  }
