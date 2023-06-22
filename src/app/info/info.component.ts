import {Component, Input, OnInit} from '@angular/core';
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit{

    hideButton: boolean;

    @Input()
    userList!: [];

    constructor(private offcanvasService: NgbOffcanvas) {
      this.hideButton = false;
    }

    ngOnInit(): void {
    }

    openInfobox(content: any) {
      this.hideButton = !this.hideButton;
      this.offcanvasService.open(content);
    }

    closeInfobox(){
      this.hideButton = !this.hideButton;
      this.offcanvasService.dismiss();
    }
}
