import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../shared/form.service';
import { UserService } from '../shared/user.service';
import { Form } from '../shared/form.model';

export interface InputType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {

  surveyForm: FormGroup;
  selectedType = [];
  inputTypes: InputType[] = [
    {value: 'checkbox', viewValue: 'Checkbox'},
    {value: 'datepicker', viewValue: 'Datepicker'},
    {value: 'email', viewValue: 'Email'},
    {value: 'number', viewValue: 'Number'},
    {value: 'radio', viewValue: 'Radio Button'},
    {value: 'select', viewValue: 'Select'},
    {value: 'tel', viewValue: 'Telephone Number'},
    {value: 'text', viewValue: 'Text'},
    {value: 'textarea', viewValue: 'Text Area'},
    {value: 'time', viewValue: 'Time'},
  ];
  userDetails;
  formLayout: Form;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {
    this.surveyForm = this.fb.group({
      survey_details: this.fb.group({
        name: '',
        description: ''
      }),
      questions: this.fb.array([this.questions])
    });

    this.userService.getUserProfile().subscribe(
      res => {
        // tslint:disable-next-line: no-string-literal
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);
      }
    );
  }

  get questions(): FormGroup {
    return this.fb.group({
      type: new FormControl(),
      title: new FormControl(),
      options: this.fb.array([this.options]),
    });
  }

  get options(): FormGroup {
    return this.fb.group({
      optionvalue: new FormControl(),
    });
  }

  addQuestion() {
    (this.surveyForm.get('questions') as FormArray).push(this.questions);
  }

  deleteQuestion(index) {
    (this.surveyForm.get('questions') as FormArray).removeAt(index);
  }

  addOption(question) {
    question.get('options').push(this.options);
  }

  deleteOption(question, index) {
    question.get('options').removeAt(index);
  }

  onSubmit(name, description, email, form) {
    this.formLayout = {
      _id: '',
      // tslint:disable-next-line: object-literal-shorthand
      name: name,
      // tslint:disable-next-line: object-literal-shorthand
      description: description,
      // tslint:disable-next-line: object-literal-shorthand
      email: email,
      // tslint:disable-next-line: object-literal-shorthand
      form: JSON.stringify(form)
    };
    this.formService.addForm(this.formLayout)
    .subscribe( data => {
      console.log(data);
    });
    this.router.navigate(['forms-list']);
  }

}
