import {DisplayedMemo, Memo} from "../models/models";

export function SetBoundarySize() {
  let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  let height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
  document.documentElement.style.setProperty('--width', `${width - (width * 0.05)}px`);
  document.documentElement.style.setProperty('--height', `${height - (height * 0.05)}px`);
}

export function CreateDisplayedMemos(existingMemos: DisplayedMemo[], incomingMemos: Memo[]): DisplayedMemo[]
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
          if(existingMemos[j].isNew)
          {
            memo.isNew = true;
          }
          if( existingMemos[i].isDifferent || existingMemos[j].message !== incomingMemos[i].message)
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

/*export function sortMemos(memoLists: DisplayedMemo[][], incomingMemos: DisplayedMemo[]){

  for (let h = 0; h <incomingMemos.length; h++) {
    for (let i = memoLists.length-1 ; i <= 0; i--) {
      for (let j = 0; j < memoLists[i].length; j++) {
        if(memoLists[i][j].id === incomingMemos[h].id){

          let index = memoLists[i].indexOf(memoLists[i][j], 0);
          if (index > -1) {
            memoLists[i].splice(index, 1);
          }

          memoLists[i].push(incomingMemos[h]);

          index = incomingMemos.indexOf(incomingMemos[h], 0);
          if (index > -1) {
            incomingMemos.splice(index, 1);
          }
        }
      }
    }
  }
  console.log(incomingMemos);
  if(incomingMemos.length > 0)
  {
    for (let i = 0; i < incomingMemos.length; i++) {
      memoLists[0].push(incomingMemos[i]);
    }
  }
}*/
