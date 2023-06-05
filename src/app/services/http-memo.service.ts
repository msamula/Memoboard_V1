import { Injectable } from '@angular/core';
import {Memo} from "../models/models";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const _url = 'https://localhost:7296/api';

@Injectable({
  providedIn: 'root'
})

export class HttpMemoService {

  constructor(private http: HttpClient) {}

  //Observable for async
  GetAllMemos() : Observable<Memo[]>  {
    return this.http.get<Memo[]>(`${_url}/Memo/GetAllMemos`);
  }

  CreateMemo(username: string, message: string): Observable<any>{
    return this.http.post(`${_url}/Memo/CreateMemo?userName=${username}&memoMessage=${message}`,null);
  }

  ChangeMemoMessage(memoID: number, newMessage: string){
    return this.http.put(`${_url}/Memo/ChangeMessage/${memoID}?newMemoMessage=${newMessage}`,null);
  }

  DeleteMemo(memoID: number): Observable<any>{
    return this.http.delete(`${_url}/Memo/DeleteMemo/${memoID}`);
  }
}

