import {Component, OnInit} from '@angular/core';
import {Memo} from "./models/memo";
import {SetBoundarySize} from "./helper/helperFunctions";
import {MemoService} from "./services/memo.service";
import {HttpMemoService} from "./services/http-memo.service";
import {SignalService} from "./services/signal.service";

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
  constructor(private memoService: MemoService, private httpMemoService: HttpMemoService, private signalService: SignalService) {

    this.username = "";
    this.message = "";
    this.memos = [];

    this.signalService.connection.on("ReceiveMemo",(user: string, message: string) => {
      //this.AddMemo(user, message);
      this.GetAllMemos();
    });
  }

  AddMemo(user: string, message: string){
    let newMemo = {} as Memo;

    newMemo.id = this.memos.length + 1;
    newMemo.user = user;
    newMemo.message = message;

    this.memos.push(newMemo);
  }

  // before the actual page load -> lifecycle method of angular
  // after the constructor
  ngOnInit(): void{

    SetBoundarySize();
    this.GetAllMemos();
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
        //this.httpMemoService.CreateMemo(this.username, this.message).subscribe();
        this.signalService.CreateMemo(this.username, this.message);
        this.message = "";
      }
      catch
      {
        window.alert('Something went wrong while creating a new memo.');
      }

      return true;
  }

  //EventHandler for memo-list.component @Output
  // filter memos and override them
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

  GetAllMemos(){
    //local data
    //this.memos = this.memoService.GetMemos();

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
