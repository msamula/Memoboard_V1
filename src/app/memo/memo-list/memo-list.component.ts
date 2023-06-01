//standard imports
import {Component, EventEmitter, Input, Output} from '@angular/core';

//user imports
import {Memo} from "../../models/memo";

//Decorator
@Component({
  selector: 'app-memo-list',                    //name of the tag in the app.component.html file
  templateUrl: './memo-list.component.html',    //html of the component
  styleUrls: ['./memo-list.component.css']      //list of css of the component
})


export class MemoListComponent
  {
    //input -> pass data down
    @Input()
    inputMemo!: Memo;

    //output -> pass data up with events
    @Output()
    remove: EventEmitter<any> = new EventEmitter();
    @Output()
    change: EventEmitter<any> = new EventEmitter();

    //emit -> fire up the event
    onRemove() {
        this.remove.emit(this.inputMemo);
    }

    onChange() {
        this.change.emit(this.inputMemo);
    }
  }
