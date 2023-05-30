import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

interface Memo{
  id: number,
  user: string,
  message: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  memos: Memo[];

  username: string;
  message: string;

  constructor(private modalService: NgbModal) {

    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    let height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    document.documentElement.style.setProperty('--width', `${width - (width * 0.1)}px`);
    document.documentElement.style.setProperty('--height', `${height - (height * 0.1)}px`);

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

  createMemo() {

    if(this.username == "" || this.message == "")
    {
       return;
    }

    let newMemo: Memo = {
      id: this.memos.length + 1,
      user: this.username,
      message: this.message
      };

      this.memos.push(newMemo);
      this.message = "";
  }

  //for bootstrap
  public open(modal: any): void {
    this.modalService.open(modal);
  }

}
