import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Template } from './template';

@Injectable()
export class TemplatesService {
  constructor(private http: HttpClient) { }

  subURL: string = '/getTemplates';

  getAllTemplates(){
    return this.http.get<Template[]>("api.api.py/templates");
  }

  postTemplate(tem: Template){
      let body = {
        template_name: tem.name,
        template_content: tem.content
      }
      this.http.post("api/api.py/templates", body);
  }
}