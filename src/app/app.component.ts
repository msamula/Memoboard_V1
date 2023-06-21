import {Component, OnInit} from '@angular/core';

import {DisplayedMemo, Memo} from "./models/models";
import {CreateDisplayedMemos, SetBoundarySize, SortMemosToLists} from "./helper/helperFunctions";

import {HttpMemoService} from "./services/http-memo.service";
import {SignalService} from "./services/signal.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {SharedService} from "./services/shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// implements is a form of inheritance
export class AppComponent implements OnInit{

  showCreateMemo: boolean;
  showBtn: boolean;

  usernameIsSet: boolean;
  loggedUser: string;

  userCounter: number;

  //smart component
  // ! -> cant be null
  allMemos!: DisplayedMemo[];
  startMemos!: DisplayedMemo[];
  activeMemos!: DisplayedMemo[];
  finishedMemos!: DisplayedMemo[];


  //DI for MemoService
  constructor(private httpMemoService: HttpMemoService, private signalService: SignalService, private sharedService: SharedService) {

    this.allMemos = [];
    this.startMemos = [];
    this.activeMemos = [];
    this.finishedMemos = [];

    this.showCreateMemo = true;
    this.showBtn = false;

    this.usernameIsSet = false;
    this.loggedUser = '';

    this.userCounter = 0;
  }

  // before the actual page load -> lifecycle method of angular
  // after the constructor
  ngOnInit(): void{

    // "UpdateMemoboard" -> "key" from signalR API
    this.signalService.connection.on("UpdateMemoboard",() => {
      this.GetAllMemos();
    });

    this.signalService.connection.on("UserCount",(userCount: number) => {
      this.userCounter = userCount;
    });

    let awaitLoginInterval = setInterval(async ()=>{

      this.usernameIsSet = this.sharedService.usernameIsSet;

      if(this.usernameIsSet){

        clearInterval(awaitLoginInterval);

        this.loggedUser = this.sharedService.GetUsername();

        //set the height of the boundary
        SetBoundarySize();

        this.GetAllMemos();
      }
    },500);
  }

  //API http data request
  GetAllMemos(){
    this.httpMemoService.GetAllMemos().subscribe( (data: Memo[]) => {

      this.allMemos = CreateDisplayedMemos(this.allMemos, data);
      [this.startMemos, this.activeMemos, this.finishedMemos] = SortMemosToLists([this.startMemos,this.activeMemos,this.finishedMemos],this.allMemos)
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
