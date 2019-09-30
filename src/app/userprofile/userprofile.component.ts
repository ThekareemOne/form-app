import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  userDetails;

  constructor( private userService: UserService, private router: Router ) { }

  ngOnInit() {
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

  Logout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }


}
