import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private subject = new Subject<any>();

  constructor() { }

  sendData(value: any) {
    this.subject.next(value);
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}
