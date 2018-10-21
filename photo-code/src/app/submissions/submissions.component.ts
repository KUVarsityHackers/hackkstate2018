import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SubmissionsService } from './submissions.service';
import { Submission } from './Submission';
import { Template } from '../templates/template';

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
      this.subService.postSubmission(s);
      this.subService.getCodeResponse(s).subscribe(out => s.output = out);
    });
  }
}



@Component({
  selector: 'upload-dialog',
  templateUrl: 'upload-dialog.html',
})
export class UploadDialog {
  templates: Template[];

  constructor(
    public dialogRef: MatDialogRef<UploadDialog>,
    public subService: SubmissionsService,
    @Inject(MAT_DIALOG_DATA) public submission: Submission) {}

  ngOnInit(){
    this.subService.getAllTemplates().subscribe(out => this.templates = out);
  }

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

  onConfirm(submission: Submission): void {
    //Add API Call to read image from submission.image
    this.subService.getImageCode(this.submission.image).subscribe(out => this.submission.code = out);
    //this.submission.code = '#include<iostream>\nint main(){std::cout << "Hi" << std::endl;return 0;}';
    let template: Template = this.templates.find(t => t.templateID == submission.templateID);
    this.submission.code = template.content.replace("[PHOTOCODE REPLACE]", this.submission.code);
    this.submission.name += "'s Submission";
    this.dialogRef.close();
  }
}
