import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  lineChart: any;
  barChart: any;
  pieChart: any;

  constructor( private userService: UserService, private router: Router ) { }

  ngOnInit() {
    // Line Chart
    this.lineChart = new Chart('lineChart', {
      type: 'line',
    data: {
     labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
     datasets: [{
         label: 'Number of Items Sold in Months',
         data: [9, 7, 3, 5, 2, 10, 15, 16, 19, 3, 1, 9],
         fill: false,
         lineTension: 0.2,
         borderColor: 'red',
         borderWidth: 1
     }]
    },
    options: {
     title: {
         text: 'Line Chart',
         display: true
     },
     scales: {
         yAxes: [{
             ticks: {
                beginAtZero: true
             }
         }]
     }
    }
    });

    // Bar Chart
    this.barChart = new Chart('barChart', {
      type: 'bar',
    data: {
     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
     datasets: [{
         label: '# of Votes',
         data: [9, 7, 3, 5, 2, 10],
         backgroundColor: [
             'rgba(255, 99, 132, 0.2)',
             'rgba(54, 162, 235, 0.2)',
             'rgba(255, 206, 86, 0.2)',
             'rgba(75, 192, 192, 0.2)',
             'rgba(153, 102, 255, 0.2)',
             'rgba(255, 159, 64, 0.2)'
         ],
         borderColor: [
             'rgba(255,99,132,1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 206, 86, 1)',
             'rgba(75, 192, 192, 1)',
             'rgba(153, 102, 255, 1)',
             'rgba(255, 159, 64, 1)'
         ],
         borderWidth: 1
     }]
    },
    options: {
     title: {
         text: 'Bar Chart',
         display: true
     },
     scales: {
         yAxes: [{
             ticks: {
                 beginAtZero: true
             }
         }]
     }
    }
    });

    // Pie Chart
    this.pieChart = new Chart('pieChart', {
      type: 'pie',
    data: {
     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
     datasets: [{
         label: '# of Votes',
         data: [9, 7, 3, 5, 2, 10],
         backgroundColor: [
             'rgba(255, 99, 132, 0.2)',
             'rgba(54, 162, 235, 0.2)',
             'rgba(255, 206, 86, 0.2)',
             'rgba(75, 192, 192, 0.2)',
             'rgba(153, 102, 255, 0.2)',
             'rgba(255, 159, 64, 0.2)'
         ],
         borderColor: [
             'rgba(255,99,132,1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 206, 86, 1)',
             'rgba(75, 192, 192, 1)',
             'rgba(153, 102, 255, 1)',
             'rgba(255, 159, 64, 1)'
         ],
         borderWidth: 1
     }]
    },
    options: {
     title: {
         text: 'Pie Chart',
         display: true
     },
     scales: {
         yAxes: [{
             ticks: {
                 beginAtZero: true
             }
         }],
         xAxes: []
     }
    }
    });
  }

  Logout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
