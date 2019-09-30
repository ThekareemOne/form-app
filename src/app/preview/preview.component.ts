import { Component, OnInit, Input } from '@angular/core';
import { Form } from '../shared/form.model';
import { Subscription } from 'rxjs';
import { FormService } from '../shared/form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  formData: any;
  parsedForm: any;
  subscription: Subscription;
  id: any;

  constructor( private formService: FormService, private route: ActivatedRoute ) {}

  ngOnInit() {
    this.getForm();
  }

  getForm() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.formService.getFormById(this.id).subscribe(data => {
      this.formData = data;
      this.parsedForm = JSON.parse(data.form);
    });
  }

}
