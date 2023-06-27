import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { checkText, emojiMap } from 'smile2emoji';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.css']
})
export class EmojiComponent implements OnInit{

  emojiStringArray: string[];

  @Output()
  emojiEvent: EventEmitter<any> = new EventEmitter();

  constructor() {

    this.emojiStringArray = [];
  }

  ngOnInit(): void {

    this.CreateEmojis();
  }

  async CreateEmojis()
  {
    for (const emojiMapKey in emojiMap) {
      this.emojiStringArray.push(checkText(emojiMapKey));
    }
  }

  ClickEmoji(emoji:string){
    this.emojiEvent.emit(emoji);
  }


}
