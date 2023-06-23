import {Component, Input, OnInit} from '@angular/core';
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {HubConnectionState} from "@microsoft/signalr";
import {SignalService} from "../services/signal.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit{

    hideButton: boolean;

    conStatus: string;
    conColor: string;

    @Input()
    userList!: [];
    @Input()
    loggedUser!: string;

    constructor(public offcanvasService: NgbOffcanvas, private signalService: SignalService) {
      this.hideButton = false;
      this.conStatus =`<i class="bi bi-wifi-1"></i> ${this.signalService.connection.state}`;
      this.conColor = 'background: #ffc107;';
    }

    ngOnInit(): void {
      this.ShowSignalRStatus();
    }

    openInfobox(content: any) {
      this.offcanvasService.open(content);
    }

    closeInfobox(){
      this.offcanvasService.dismiss();
    }

    ShowSignalRStatus(){

      setInterval(async ()=>{

        if(this.signalService.connection.state === HubConnectionState.Connected)
        {
          this.conStatus =`<i class="bi bi-wifi"></i> ${this.signalService.connection.state}`;
          this.conColor = 'background: #198754;';
        }


        if((this.signalService.connection.state === HubConnectionState.Connecting) || (this.signalService.connection.state === HubConnectionState.Reconnecting))
        {
          this.conStatus =`<i class="bi bi-wifi-1"></i> ${this.signalService.connection.state}`;
          this.conColor = 'background: #ffc107;';
        }


        if(this.signalService.connection.state === HubConnectionState.Disconnected)
        {
          this.conStatus =`<i class="bi bi-wifi-off"></i> ${this.signalService.connection.state}`;
          this.conColor = 'background: #dc3545;';

          this.signalService.UpdateMemoboard();       //-> UpdateMemoboard() automatically trying to reconnect
        }
      },2000);
    }
}
