import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})
export class SubmissionsComponent implements OnInit {
  supportedLanguages: String[] = ['C++', 'Java'];
  submissions: Submission[] = [];
  selectedSubmission: Submission;
  formData: any = {
    fromdate: Date,
    todate: Date,
    language: String,
    code: String
  };


  constructor() { }

  ngOnInit() {
  }

  uploadSubmission() {
    let s = new Submission()
    this.selectedSubmission = s;
    this.submissions.push(s);
  }

}

class Submission {
  image: String;
  code: String;
  output: String;
  name: String;

  constructor() {
    this.image = "https://www.maxpixel.net/static/photo/1x/Photoshop-Coding-Code-Programming-Php-Web-Symbol-3647303.jpg";
    this.code = "int main(){}";
    this.output = "out";
    this.name = "Daniel's Submission"
  }
}
