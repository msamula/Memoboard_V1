import { Component } from '@angular/core';
import {SignalService} from "../../services/signal.service";

@Component({
  selector: 'app-create-memo',
  templateUrl: './create-memo.component.html',
  styleUrls: ['./create-memo.component.css']
})

export class CreateMemoComponent {
  username: string;
  message: string;

  constructor(private signalService: SignalService) {
    this.username = '';
    this.message = '';
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
      this.signalService.CreateMemo(this.username, this.message);
      this.message = "";
    }
    catch
    {
      window.alert('Something went wrong while creating a new memo.');
    }
  }
}
