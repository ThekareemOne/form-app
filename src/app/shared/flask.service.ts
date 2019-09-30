import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    NBParameters,
    NBResult,
    ProbabilityPrediction,
    Questions
} from './types';

const SERVER_URL: string = 'api/';


@Injectable({
  providedIn: 'root'
})
export class FlaskService {

  constructor( private http: HttpClient ) { }

  trainModel(nbParameters: NBParameters): Observable<NBResult> {
    return this.http.post<NBResult>('http://127.0.0.1:8081/api/train', nbParameters);
  }

  public predict(question: Questions): Observable<ProbabilityPrediction[]> {
    return this.http.post<ProbabilityPrediction[]>('http://127.0.0.1:8081/api/predict', question);
  }
}
