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
    trigger('showChange', [

      state('start',
        style({
          // normal style
        })),

      state('changed',
        style({
          backgroundColor: '#ffc107',
          /*scale: 0.8*/
        })),

      transition('start <=> changed', [
        animate('0.3s')
      ])
    ]),


    trigger('showNew', [

      state('start',
        style({
          // normal style
        })),

      state('new',
        style({
          backgroundColor: '#198754',
/*          opacity: 0.9,
          scale: 1.2*/
        })),

      transition('start <=> new', [
        animate('0.3s')
      ])
    ]),
  ]
})


export class MemoListComponent implements OnInit{
    createNewMessage: boolean;
    newMessageInput: string;
    memoChanged: boolean;
    memoNew: boolean;
    iSaw: boolean;

    constructor() {
      this.newMessageInput = "";
      this.createNewMessage = false;
      this.iSaw = true;
      this.memoChanged = true;
      this.memoNew = true;

    }

    ngOnInit(): void {
      this.Animate();
    }

    //inputMemo -> pass data down (memo from *ngFor="let memo of memos;" from app.component.ts)
    @Input()
    inputMemo!: DisplayedMemo;
    @Input()
    loggedUser!: string;

    //output -> pass data up with events
    @Output()
    remove: EventEmitter<any> = new EventEmitter();
    @Output()
    confirmChange: EventEmitter<any> = new EventEmitter();

    //emit -> fire up the event

    OnRemove() {
      this.remove.emit(this.inputMemo);
    }

    OnChange() {
      this.createNewMessage = !this.createNewMessage;
    }

    OnConfirmChange() {
      this.inputMemo.message = this.newMessageInput;
      this.confirmChange.emit(this.inputMemo);
    }

    Animate(){
      if(this.inputMemo.isNew){

        setTimeout(()=>{
          this.memoNew = !this.memoNew;
          this.iSaw = !this.iSaw;
        },1);
      }

      if(this.inputMemo.isDifferent){

        setTimeout(()=>{
          this.memoChanged = !this.memoChanged;
          this.iSaw = !this.iSaw;
        },1);
      }
    }

  iSawMemo() {
    if(this.inputMemo.isDifferent){
      this.memoChanged = !this.memoChanged;
      this.inputMemo.isDifferent = false;
    }
    if(this.inputMemo.isNew){
      this.memoNew = !this.memoNew;
      this.inputMemo.isNew = false;
    }
    this.iSaw = !this.iSaw;
  }
}
