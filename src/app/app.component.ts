import {Component, OnInit} from '@angular/core';
import {Memo} from "./models/memo";
import {GetWindowSize} from "./helper/helperFunctions";
import {MemoService} from "./services/memo.service";
import {HttpMemoService} from "./services/http-memo.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// implements is a form of inheritance
export class AppComponent implements OnInit{
  username: string;
  message: string;

  //smart component
  // ! -> cant be null
  memos!: Memo[];

  //DI for MemoService
  constructor(private memoService: MemoService, private httpMemoService: HttpMemoService) {

    this.username = "";
    this.message = "";
    this.memos = [];
  }

  // before the actual page load -> lifecycle method of angular
  // after the constructor
  ngOnInit(): void{
      GetWindowSize();

      //local data
      //this.memos = this.memoService.GetMemos();

      this.httpMemoService.GetAllMemos().subscribe((data: Memo[]) => {

        for (let i = 0; i < data.length; i++) {
          data[i].id = this.memos.length + 1;
          data[i].user = data[i].user['userName'];
          this.memos.push(data[i]);
        }
      });
  }

  CreateMemo() {
      if(this.username == "")
      {
        window.alert('Please enter a username.');
        return;
      }

      if(this.message == "")
      {
        window.alert('Please enter a message.');
        return;
      }

      try
      {
        let newMemo: Memo = {
          id: this.memos.length + 1,
          user: this.username,
          message: this.message
        };

        this.memos.push(newMemo);
        this.message = "";
      }
      catch
      {
        window.alert('Something went wrong while creating a new memo.');
      }

      return true;
  }

  handleDelete(event: Memo) {
    this.memos = this.memos.filter((memo: Memo) =>{
      return memo.id !== event.id;
    })
  }

  handleChange(event: Memo) {
    this.memos = this.memos.filter((memo: Memo) =>{
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
    })
  }
}
