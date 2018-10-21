import { Component, OnInit } from '@angular/core';
import { Template } from './template';
import { TemplatesService } from './templates.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  selectedTemplate: Template = null;
  templates: Template[] = [];

  supportedLanguages: String[] = ['C++', 'Java'];

  constructor(public tempService: TemplatesService) { }

  ngOnInit() {
    this.getTemplates();
  }

  getTemplates() {
    this.tempService.getAllTemplates().subscribe(out => {
      out.forEach(arr => {
        let t = new Template();
        t.templateID = arr[0];
        t.name = arr[1];
        t.content = arr[2];
        this.templates.push(t);
      })
    });
  }

  selectNewTemplate(){
    let t = new Template();
    this.selectedTemplate = t;
  }

  createTemplate(template: Template){
    this.tempService.postTemplate(template).subscribe((out: number) => template.templateID = out);
    this.templates.push(template);
  }
}
