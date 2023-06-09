import {DisplayedMemo, Memo} from "../models/models";

export function SetBoundarySize() {
  let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  let height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
  document.documentElement.style.setProperty('--width', `${width - (width * 0.1)}px`);
  document.documentElement.style.setProperty('--height', `${height - (height * 0.15)}px`);
}

export function CreateDisplayMemos(existingMemos: DisplayedMemo[], incomingMemos: Memo[]): DisplayedMemo[]
{
  let results: DisplayedMemo[] = [];

  for(let i = 0; i < incomingMemos.length; i++) {

    let memo = {} as DisplayedMemo;
    memo.id = incomingMemos[i].id;
    memo.user = incomingMemos[i].user;
    memo.message = incomingMemos[i].message;
    memo.isDifferent = false;
    memo.isNew = false;

    if(existingMemos.length > 0){

      memo.isNew = incomingMemos[i].id > existingMemos[existingMemos.length-1].id;

      for(let j = 0; j < existingMemos.length; j++) {

        if(existingMemos[j].id === incomingMemos[i].id)
        {

          if(existingMemos[j].message !== incomingMemos[i].message)
          {
            memo.isDifferent = true;
          }
        }
      }
    }

    results.push(memo);
  }

  return results;
}
