import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  successMessage = '';

  constructor( private userService: UserService, private router: Router ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/formbuilder');
    }
  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  login() {
    if (!this.loginForm.valid) {
        console.log('INVALID');
        return;
    }

    // console.log(JSON.stringify(this.loginForm.value));
    this.userService.login(this.loginForm.value)
    .subscribe(
      res => {
// tslint:disable-next-line: no-string-literal
        this.userService.setToken(res['token']);
        this.router.navigate(['/formbuilder']);
      },
      error => console.error(error)
    );
  }

}
