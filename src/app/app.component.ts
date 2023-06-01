import { Component } from '@angular/core';
import {Memo} from "./models/memo";
import {GetWindowSize} from "./helper/helperFunctions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  username: string;
  message: string;

  //smart component
  memos: Memo[];

  constructor() {

    GetWindowSize();

    this.username = "";
    this.message = "";

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
}
