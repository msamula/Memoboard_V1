import {DisplayedMemo, Memo, Token} from "../models/models";

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

export function SortMemosToLists(memoLists: DisplayedMemo[][], incomingMemos: DisplayedMemo[]){

  let temp: DisplayedMemo[] = incomingMemos;
  let tempList: DisplayedMemo[][] = [[],[],[]];

  for (let k = 0; k < incomingMemos.length; k++) {

    for (let i = 0 ; i < memoLists.length; i++) {

      for (let j = 0; j < memoLists[i].length; j++) {

        if(memoLists[i][j].id === incomingMemos[k].id){

          tempList[i].push(incomingMemos[k]);
          temp = temp.filter(item => item != incomingMemos[k]);
        }
      }
    }
  }

  if(temp.length > 0)
  {
    for (let i = 0; i < temp.length; i++) {
      tempList[0].push(temp[i]);
    }
  }

  return [tempList[0],tempList[1],tempList[2]];
}

export async function RefreshToken(token: Token){
  setInterval(()=>{
    let expireTime = (token.exp*1000 - new Date().getTime())/1000;
    if(expireTime <= 15){
      window.alert('Your session expired. Please sign in again.');
      window.location.reload();
    }
  },10000);
}
