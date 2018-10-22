import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Submission } from './Submission';
import { Template } from '../templates/template';

@Injectable()
export class SubmissionsService {
  constructor(private http: HttpClient) { }

  getSubmissionResponse(templateID: number){
    let headers: Headers = new Headers();
    headers.append('tempId', templateID.toString());
    return this.http.get<Submission[]>("http://photocode.net:8080/api/submissions");
  }

  getAllTemplates(){
    return this.http.get<Template[]>("http://photocode.net:8080/api/templates");
  }

  postSubmission(sub: Submission){
      let body = {
        tempId: sub.templateID + 1,
        submission_name: sub.name,
        submission_content: sub.code

      }
      let response = this.http.post<number>("http://photocode.net:8080/api/submissions", body);
      return response;
  }

  getCodeResponse(Submission){
    let body = {
    	script : Submission.code,
        language: "cpp14",
        versionIndex: "2",
        clientId: "43540fa13cb920a980bb8011740ba63f",
    	clientSecret:"463414f3fccd12261c2afcff044d17937207c1f8c1c1b60a3ee181b314c6cfda"
    }
    let response = this.http.post<string>('https://api.jdoodle.com/execute', body);
    return response;
  }

  getImageCode(image: string){
    let headers: Headers = new Headers();
    headers.append("b64", image.substr(image.indexOf("/9")));
    headers.append("fileName", "temp." + image.substring(image.indexOf("/") + 1, image.indexOf(";")))
    let body = {
        b64: image.substr(image.indexOf("/9")),
        fileName: "temp." + image.substring(image.indexOf("/") + 1, image.indexOf(";"))
    }
    let response = this.http.post<string>('http://photocode.net:8080/OCR', body); 
    return response;
  }
}