import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isActive = false;
  isActive2 = false;

  manageTemplates() {
    alert("Managing Templates");
  }

  viewSubmissions() {
    alert("Viewing Submissions");
  }
}
