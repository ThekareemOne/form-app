import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from '../shared/form.model';
import { FormService } from '../shared/form.service';

@Component({
  selector: 'app-list-forms',
  templateUrl: './list-forms.component.html',
  styleUrls: ['./list-forms.component.scss']
})
export class ListFormsComponent implements OnInit {

  forms: Form[];
// tslint:disable-next-line: ban-types
  singleForm: string;

  userDetails;

  constructor( private formService: FormService, private router: Router ) { }

  ngOnInit() {
    this.getAllForms();
  }

  getAllForms(): void {
    this.formService.getAllForms().subscribe(data => {
      this.forms = data;
    });
  }

  getFormById(form: Form) {
    return this.formService.getFormById(form._id).subscribe(data => {
      this.singleForm = data.form;
    });
  }

  addForm(): void {
    this.router.navigate(['formbuilder']);
  }

  deleteForm(form: Form) {
    this.formService.deleteForm(form._id).subscribe(data => {
      console.log(data);
      this.getAllForms();
    });
  }

  updateForm(form: Form) {
    // tslint:disable-next-line: quotemark
    localStorage.removeItem("formId");
    // tslint:disable-next-line: quotemark
    localStorage.setItem("formId", form._id);
    this.router.navigate(['edit-form']);
  }

  sendData(form: Form) {
    this.getFormById(form);
    this.router.navigate(['preview', form._id]);
  }

  viewStatistics() {
    this.router.navigate(['dashboard']);
  }

}
