import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Form } from '../shared/form.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor( private http: HttpClient ) { }

  getAllForms() {
    return this.http.get<Form[]>(environment.apiBaseUrl + '/forms');
  }

  getFormById(id: string) {
    return this.http.get<Form>(environment.apiBaseUrl + '/forms' + '/' + id);
  }

  addForm(form: Form) {
    return this.http.post(environment.apiBaseUrl + '/forms', form);
  }

  deleteForm(id: string) {
    return this.http.delete(environment.apiBaseUrl + '/forms' + '/' + id);
  }

  updateForm(form: Form) {
    return this.http.put(environment.apiBaseUrl + '/forms' + '/' + form._id, form);
  }
}
