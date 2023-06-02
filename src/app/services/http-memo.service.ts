import { Injectable } from '@angular/core';
import {Memo} from "../models/memo";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const _url = 'https://localhost:7296';

@Injectable({
  providedIn: 'root'
})

export class HttpMemoService {

  constructor(private http: HttpClient) {

  }

  //Observable for async
  GetAllMemos() : Observable<Memo[]>  {
    return this.http.get<Memo[]>(`${_url}/api/Memo/GetAllMemos`);
  }

  CreateMemo(username: string, message: string): Observable<any>{
    return this.http.post(`${_url}/CreateMemo?userName=${username}&memoMessage=${message}`,null);
  }
}
