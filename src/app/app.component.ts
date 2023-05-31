import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MemoModule} from "./memo/memo.module";

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
    console.log(this.username + ' ' + this.message);
  }

  //for bootstrap???
  //public open(modal: any): void {
  //  this.modalService.open(modal);
  //}
}
