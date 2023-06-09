//standard imports
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

//user imports
import {DisplayedMemo} from "../../models/models";

//Decorator
@Component({
  selector: 'app-memo-list',                    //name of the tag in the app.component.html file
  templateUrl: './memo-list.component.html',    //html of the component
  styleUrls: ['./memo-list.component.css'],     //list of css of the component

  animations: [
    trigger('trigger', [

      state('start',

        style({

        })),
      state('end',

        style({
          backgroundColor: '#ffc107',
          scale: 0.8
        })),
      state('new',

        style({
          backgroundColor: '#198754',
          opacity: 0.9,
          scale: 1.2
        })),
      transition('start => end', [
        animate('0.3s')
      ]),
      transition('end => start', [
        animate('0.3s')
      ]),
      transition('start => new', [
        animate('0.3s')
      ]),
      transition('new => start', [
        animate('0.3s')
      ]),
    ]),
  ]
})


export class MemoListComponent implements OnInit{
    createNewMessage: boolean;
    newMessageInput: string;
    memoChanged: boolean;
    memoNew: boolean;

    constructor() {
      this.newMessageInput = "";
      this.createNewMessage = false;
      this.memoChanged = true;
      this.memoNew = true;

    }

    ngOnInit(): void {

      if(this.inputMemo.isNew){

        setTimeout(()=>{
          this.memoNew = !this.memoNew;
        },1);

        setTimeout(()=>{
          this.memoNew = !this.memoNew;
        },310);
      }

      if(this.inputMemo.isDifferent){

        setTimeout(()=>{
          this.memoChanged = !this.memoChanged;
        },1);

        setTimeout(()=>{
          this.memoChanged = !this.memoChanged;
        },310);
      }
    }

    //inputMemo -> pass data down (memo from *ngFor="let memo of memos;" from app.component.ts)
    @Input()
    inputMemo!: DisplayedMemo;

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
      this.createNewMessage = !this.createNewMessage;
    }

    onConfirmChange() {
      this.inputMemo.message = this.newMessageInput;
      this.confirmChange.emit(this.inputMemo);
    }
}
