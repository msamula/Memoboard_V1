import {Component, OnInit} from '@angular/core';

import {Memo} from "./models/models";
import {SetBoundarySize} from "./helper/helperFunctions";

import {HttpMemoService} from "./services/http-memo.service";
import {SignalService} from "./services/signal.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// implements is a form of inheritance
export class AppComponent implements OnInit{

  //smart component
  // ! -> cant be null
  memos!: Memo[];

  //DI for MemoService
  constructor(private httpMemoService: HttpMemoService, private signalService: SignalService) {

    this.memos = [];
  }

  // before the actual page load -> lifecycle method of angular
  // after the constructor
  ngOnInit(): void{

    SetBoundarySize();

    this.GetAllMemos();

    this.signalService.connection.on("UpdateMemoboard",() => {
      this.GetAllMemos();
    });
  }

  //API http data request
  async GetAllMemos(){
    this.httpMemoService.GetAllMemos().subscribe((data: Memo[]) => {
      this.memos = data;
    });
  }

  //EventHandler for memo-list.component @Output
  // filter memos and override them
  async handleDelete(event: Memo) {
    this.httpMemoService.DeleteMemo(event.id).subscribe()
      .add(()=>{
        this.signalService.UpdateMemoboard();
      });
  }

  async handleChange(event: Memo) {

    this.httpMemoService.ChangeMemoMessage(event.id,event.message).subscribe()
      .add(()=>{
        this.signalService.UpdateMemoboard();
      });
  }
}
