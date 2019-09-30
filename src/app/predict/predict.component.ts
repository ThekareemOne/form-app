import { Component, OnInit } from '@angular/core';

import {FlaskService} from '../shared/flask.service';
import {
    NBParameters,
    NBResult,
    Questions,
    ProbabilityPrediction
} from '../shared/types';
import * as Chart from 'chart.js';

export interface QuestType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss']
})
export class PredictComponent implements OnInit {

  QUESTS: QuestType[] = [
    {value: 'DISTRICT', viewValue: 'DISTRICT'},
    {value: 'FACILITY', viewValue: 'FACILITY'},
    {value: 'TC', viewValue: 'TC'},
    {value: 'OPDCLIN', viewValue: 'OPDCLIN'},
    {value: 'OWNER', viewValue: 'OWNER'},
    {value: 'SEX', viewValue: 'SEX'},
    {value: 'AGE', viewValue: 'AGE'},
    {value: 'FINSTAT', viewValue: 'FINSTAT'},
    {value: 'WEIGHT', viewValue: 'WEIGHT'}
  ];
  s_accuracy = 88.3;

  pieChart: any;

  nbParameters: NBParameters = new NBParameters();
  nbResult: NBResult;

  questions = new Questions();
  probabilityPredictions: ProbabilityPrediction[];

  constructor( private flaskService: FlaskService ) { }

  ngOnInit() {
  }

  trainModel() {
    this.flaskService.trainModel(this.nbParameters).subscribe((nbResult) => { this.nbResult = nbResult; });
  }

  predict() {
    this.flaskService.predict(this.questions).subscribe((probabilityPredictions) => {
      this.probabilityPredictions = probabilityPredictions;
    });
  }

}
