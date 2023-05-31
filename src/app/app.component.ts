import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MemoModule} from "./memo/memo.module";
import {MemoListComponent} from "./memo/memo-list/memo-list.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  username: string;
  message: string;

  //constructor for bootstrap???
  //constructor(private modalService: NgbModal) {

  constructor() {
    this.username = "";
    this.message = "";
  }

  CreateMemo()
  {
    let memo = new MemoListComponent();

    let memoCreated = memo.createMemo(this.username, this.message);

    if(!memoCreated)
    {
      window.alert("Something went wrong while creating a new memo. Check if the username and the message is filled.");
    }
  }

  //for bootstrap???
  //public open(modal: any): void {
  //  this.modalService.open(modal);
  //}
}
