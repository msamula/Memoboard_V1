import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit{
    logo: string;

    @Input()
    userCountInput!: number;

    constructor() {
      this.logo = `<i class="bi bi-person-circle"></i>&nbsp;&nbsp;&nbsp;`;
    }

    ngOnInit(): void {

    }
}
