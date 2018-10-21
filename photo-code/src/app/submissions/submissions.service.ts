import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Submission } from './Submission';

@Injectable()
export class SubmissionsService {
  constructor(private http: HttpClient) { }

  subURL: string = 'api/submission';

  getSubmissionResponse(){
    this.http.get<Submission[]>(this.subURL);
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
    let response = this.http.post<string>('api/image', body); 
    return response;
  }
}