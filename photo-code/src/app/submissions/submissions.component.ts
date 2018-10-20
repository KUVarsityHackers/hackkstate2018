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
	var recBody;
	function CompileAndRun(arguments){
		var request = require('request');

		var program = {
			script : arguments,
			language: "cpp14",
			versionIndex: "2",
			clientId: "43540fa13cb920a980bb8011740ba63f",
			clientSecret:"463414f3fccd12261c2afcff044d17937207c1f8c1c1b60a3ee181b314c6cfda"
		};
		request({
			url: 'https://api.jdoodle.com/execute',
			method: "POST",
			json: program
			},
		function (error, response, body) {
			recBody = body;
			
		});
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
