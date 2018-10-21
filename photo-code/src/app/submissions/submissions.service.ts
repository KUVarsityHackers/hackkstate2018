import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Submission } from './Submission';
import { Template } from '../templates/template';

@Injectable()
export class SubmissionsService {
  constructor(private http: HttpClient) { }

  subURL: string = '/getSubmissions';

  getSubmissionResponse(){
    return this.http.get<Submission[]>("api/api.py/submissions");
  }

  getAllTemplates(){
    return this.http.get<Template[]>("api.api.py/templates");
  }

  postSubmission(sub: Submission){
      let body = {
        template_id: sub.templateID,
        submission_name: sub.name,
        submission_content: sub.code

      }
      this.http.post("api/api.py/submissions", body);
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

  getImageCode(image){
    let body = {
        b64: image[3],
        fileName: image[1]
    }
    let response = this.http.post<string>('api/ocr', body); 
    return response;
  }
}