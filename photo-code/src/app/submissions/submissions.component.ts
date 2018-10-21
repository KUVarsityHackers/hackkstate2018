import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SubmissionsService } from './submissions.service';
import { Submission } from './Submission';

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


  constructor(public dialog: MatDialog,
    public subService: SubmissionsService) { }

  ngOnInit() {
  }

  uploadSubmission() {
    let s = new Submission();
    this.selectedSubmission = s;
    this.submissions.push(s);

    const dialogRef = this.dialog.open(UploadDialog, {
      width: '500px',
      data: s
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.subService.getCodeResponse(s).subscribe(out => s.output = out);
    });

  }
	
	// CompileAndRun(args: String = ''){
	// 	let request = require('request');

	// 	let program = {
	// 		script : args,
	// 		language: "cpp14",
	// 		versionIndex: "2",
	// 		clientId: "43540fa13cb920a980bb8011740ba63f",
	// 		clientSecret:"463414f3fccd12261c2afcff044d17937207c1f8c1c1b60a3ee181b314c6cfda"
	// 	};
	// 	request({
	// 		url: 'https://api.jdoodle.com/execute',
	// 		method: "POST",
	// 		json: program
	// 		},
	// 	function (error, response, body) {
	// 		let recBody = body;
			
	// 	});
	// }

}



@Component({
  selector: 'upload-dialog',
  templateUrl: 'upload-dialog.html',
})
export class UploadDialog {

  constructor(
    public dialogRef: MatDialogRef<UploadDialog>,
    public subService: SubmissionsService,
    @Inject(MAT_DIALOG_DATA) public submission: Submission) {}

  onFileChanged(event): void {
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.submission.image = reader.result;
    }
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(submission): void {
    //Add API Call to read image from submission.image
    this.subService.getImageCode(this.submission.image).subscribe(out => this.submission.code = out);
    //this.submission.code = '#include<iostream>\nint main(){std::cout << "Hi" << std::endl;return 0;}';
    this.submission.name += "'s Submission";
    this.dialogRef.close();
  }
}
