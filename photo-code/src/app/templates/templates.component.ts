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
    this.tempService.getAllTemplates().subscribe(out => this.templates = out);
  }

  selectNewTemplate(){
    let t = new Template();
    this.selectedTemplate = t;
  }

  createTemplate(template: Template){
    this.tempService.postTemplate(template);
    this.getTemplates();
  }
}
