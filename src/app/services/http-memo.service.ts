import {Injectable, OnInit} from '@angular/core';
import {Memo} from "../models/models";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const _url = 'https://localhost:7296/api';
//const _url = 'http://192.168.178.119/api';

@Injectable({
  providedIn: 'root'
})

export class HttpMemoService {

  tokenHeader: HttpHeaders;

  constructor(private http: HttpClient) {
    this.tokenHeader = new HttpHeaders();
  }

  //Observable for async

  RegisterUser(body: any): Observable<any>{
      return this.http.post(`${_url}/User/Register`,body, {headers: {'Content-Type': 'application/json'},observe: "response"});
  }

  VerifyUser(body: any): Observable<any>{
    return this.http.post(`${_url}/User/Verify`,body, {headers: {'Content-Type': 'application/json'},observe: "response"});
  }

  GetAllMemos() : Observable<Memo[]>  {
    return this.http.get<Memo[]>(`${_url}/Memo/GetAllMemos`,{headers: this.tokenHeader});
  }

  CreateMemo(message: string): Observable<any>{
    return this.http.post(`${_url}/Memo/CreateMemo`,`"${message}"`,{headers: this.tokenHeader,observe: "response"});
  }

  ChangeMemoMessage(memoID: number, newMessage: string): Observable<any>{
    return this.http.put(`${_url}/Memo/ChangeMessage/${memoID}?newMemoMessage=${newMessage}`,null, {headers: this.tokenHeader});
  }

  DeleteMemo(memoID: number): Observable<any>{
    return this.http.delete(`${_url}/Memo/DeleteMemo/${memoID}`,{headers: this.tokenHeader});
  }

  SetTokenHeader(token: string)
  {
    this.tokenHeader = this.tokenHeader.set('Authorization', `Bearer ${token}`);
    this.tokenHeader = this.tokenHeader.set('Content-Type', 'application/json');
  }
}

