import {Component, OnInit} from '@angular/core';
import {Memo} from "../../models/memo";
import {GetWindowSize} from "../../helper/helperFunctions";

@Component({
  selector: 'app-memo-list',                    //name of the tag in the app.component.html file
  templateUrl: './memo-list.component.html',    //html of the component
  styleUrls: ['./memo-list.component.css']      //list of css of the component
})

// implements is a form of inheritance
  export class MemoListComponent implements OnInit{

  //smart component
  //
  memos: Memo[];

  constructor() {
    GetWindowSize();

    this.memos = [
      {
        id: 1,
        user: 'Alexander',
        message: 'Meine NaviApp ist voll geil digga!'
      },
      {
        id: 2,
        user: 'Michael',
        message: 'Was geht ab?'
      },
      {
        id: 3,
        user: 'Poorja',
        message: 'Brille?'
      },
      {
        id: 4,
        user: 'Gökhan',
        message: 'Autokorso wallah billa'
      },
      {
        id: 5,
        user: 'Alexander',
        message: 'Hilfeeeee!'
      },
      {
        id: 6,
        user: 'Michael',
        message: 'ay ay ay?'
      },
      {
        id: 7,
        user: 'Poorja',
        message: 'Fielmann?'
      },
      {
        id: 8,
        user: 'Gökhan',
        message: 'Wallah billa'
      }
    ];
  }

  // before the actual page load -> lifecycle method
  // but after the constructor
  ngOnInit(): void{

  }

  createMemo(username: string, message: string) {
    if(username == "" || message == "")
    {
      return false;
    }

    try
    {
      let newMemo: Memo = {
        id: this.memos.length + 1,
        user: username,
        message: message
      };

      this.memos.push(newMemo);
    }
    catch
    {
      return false;
    }

    console.log(this.memos);
    return true;
  }
}
