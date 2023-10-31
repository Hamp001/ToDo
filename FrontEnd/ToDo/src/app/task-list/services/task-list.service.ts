import { Injectable } from '@angular/core';
import {HttpClient}from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  constructor(private http:HttpClient){}

  sendData(data: any): Observable<any> {
    console.log("data",data);
    return this.http.post('http://localhost:3000/', data);
  }
}
