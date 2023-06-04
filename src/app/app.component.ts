import {Component, OnInit} from '@angular/core';

import {Memo} from "./models/memo";
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

  //EventHandler for memo-list.component @Output
  // filter memos and override them
  handleDelete(event: Memo) {
    this.memos = this.memos.filter((memo: Memo) =>{
      return memo.id !== event.id;
    })
  }

  handleChange(event: Memo) {
/*    this.memos = this.memos.filter((memo: Memo) =>{
      if(memo.id === event.id)
      {
        if(this.message === '')
        {
          window.alert('Please enter a new message!');
          return memo;
        }

        event.message = this.message;
        this.message = '';
      }
      return memo;
    })*/
  }

  GetAllMemos(){

    //API data request
    this.httpMemoService.GetAllMemos().subscribe((data: Memo[]) => {
      for (let i = 0; i < data.length; i++) {
        data[i].id = i + 1;
        data[i].user = data[i].user['userName'];
      }

      this.memos = data;
    });
  }

}
