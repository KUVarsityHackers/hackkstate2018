import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Template } from './template';

@Injectable()
export class TemplatesService {
  constructor(private http: HttpClient) { }

  getAllTemplates(){
    return this.http.get<Template[]>("http://photocode.net:8080/api/templates");
  }

  postTemplate(tem: Template){
      let body = {
        template_name: tem.name,
        template_content: tem.content
      }
      this.http.post("http://photocode.net:8080/api/templates", body);
  }
}