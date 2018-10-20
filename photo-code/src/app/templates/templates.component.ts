import { Component, OnInit } from '@angular/core';
import { Template } from '../template';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  selectedTemplate: Template = null;
  templates: Template[] = [];

  supportedLanguages: String[] = ['C++', 'Java'];

  constructor() { }

  ngOnInit() {

  }

  createTemplate(){
    let t = new Template();
    this.templates.push(t);
    this.selectedTemplate = t;
  }
}
