//standard imports
import {Component, Input, OnInit} from '@angular/core';

//user imports
import {Memo} from "../../models/memo";
import {GetWindowSize} from "../../helper/helperFunctions";

//Decorator
@Component({
  selector: 'app-memo-list',                    //name of the tag in the app.component.html file
  templateUrl: './memo-list.component.html',    //html of the component
  styleUrls: ['./memo-list.component.css']      //list of css of the component
})

// implements is a form of inheritance
  export class MemoListComponent implements OnInit{

  //input -> pass data down
  @Input()
  inputMemo!: Memo;

  constructor() {
  }

  // before the actual page load -> lifecycle method of angular
  // after the constructor
  ngOnInit(): void{

  }
}
