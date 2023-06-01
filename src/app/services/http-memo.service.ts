import { Injectable } from '@angular/core';
import {Memo} from "../models/memo";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const MemoboardAPI = 'https://localhost:7296/api/Memo/GetAllMemos';

@Injectable({
  providedIn: 'root'
})

export class HttpMemoService {

  constructor(private http: HttpClient) {

  }

  //Observable for async
  GetAllMemos() : Observable<Memo[]>  {
    return this.http.get<Memo[]>(MemoboardAPI);
  }
}
