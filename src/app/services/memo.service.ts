import { Injectable } from '@angular/core';
import {Memo} from "../models/memo";

//DI
// add service to app.module.ts under provider
@Injectable({
  providedIn: 'root'
})
export class MemoService {

  constructor() { }

  GetMemos() : Memo[] {
      return [
        {
          id: 1,
          user: 'Alexander',
          message: 'Meine NaviApp ist voll geil digga!'
        },
        {
          id: 2,
          user: 'Michael',
          message: 'Was geht ab?'
        },
        {
          id: 3,
          user: 'Poorja',
          message: 'Brille?'
        },
        {
          id: 4,
          user: 'Gökhan',
          message: 'Autokorso wallah billa'
        },
        {
          id: 5,
          user: 'Alexander',
          message: 'Hilfeeeee!'
        },
        {
          id: 6,
          user: 'Michael',
          message: 'ay ay ay?'
        },
        {
          id: 7,
          user: 'Poorja',
          message: 'Fielmann?'
        },
        {
          id: 8,
          user: 'Gökhan',
          message: 'Wallah billa'
        }
      ];
  }
}
