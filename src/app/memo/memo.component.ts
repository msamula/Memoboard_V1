import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memo',                   //name of the tag in the app.component.html file
  templateUrl: './memo.component.html',   //html of the component
  styleUrls: ['./memo.component.css']     //list of css of the component
})

// implements is a form of inheritance
  export class MemoComponent implements OnInit{

  number: number = 1;

  constructor() {
    console.log(`constructor ${this.number}`);
    this.number++;
  }

  // before the actual page load -> lifecycle method
  // but after the constructor
  ngOnInit(): void{
    console.log(`ngOnInit ${this.number}`);
  }
}
