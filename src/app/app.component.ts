import {Component, OnInit} from '@angular/core';

import {DisplayedMemo, Memo} from "./models/models";
import {CreateDisplayedMemos, SetBoundarySize} from "./helper/helperFunctions";

import {HttpMemoService} from "./services/http-memo.service";
import {SignalService} from "./services/signal.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// implements is a form of inheritance
export class AppComponent implements OnInit{

  showCreateMemo: boolean;
  showBtn: boolean;

  //smart component
  // ! -> cant be null
  memos!: DisplayedMemo[];
  activeMemos!: DisplayedMemo[];
  finishedMemos!: DisplayedMemo[];


  //DI for MemoService
  constructor(private httpMemoService: HttpMemoService, private signalService: SignalService) {

    this.memos = [];
    this.activeMemos = [];
    this.finishedMemos = [];

    this.showCreateMemo = true;
    this.showBtn = false;
  }

  // before the actual page load -> lifecycle method of angular
  // after the constructor
  ngOnInit(): void{

    //set the height of the boundary
    SetBoundarySize();

    // "UpdateMemoboard" -> "key" from signalR API
    this.signalService.connection.on("UpdateMemoboard",() => {
      this.GetAllMemos();
    });

    this.GetAllMemos();
  }

  //API http data request
  async GetAllMemos(){
    this.httpMemoService.GetAllMemos().subscribe((data: Memo[]) => {

      this.memos = CreateDisplayedMemos(this.memos, data);
    });
  }

  //EventHandler for memo-list.component @Output
  // filter memos and override them
  async handleDelete(event: DisplayedMemo) {
    this.httpMemoService.DeleteMemo(event.id).subscribe()
      .add(()=>{
        this.signalService.UpdateMemoboard();
      });
  }

  async handleChange(event: DisplayedMemo) {

    this.httpMemoService.ChangeMemoMessage(event.id,event.message).subscribe()
      .add(()=>{
        this.signalService.UpdateMemoboard();
      });
  }

  SwitchBtnCreateMemo() {
    this.showCreateMemo = !this.showCreateMemo;
    this.showBtn = !this.showBtn;
  }

  drop(event: CdkDragDrop<DisplayedMemo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
