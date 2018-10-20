import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { TemplatesComponent } from './templates/templates.component';
import { SubmissionsComponent } from './submissions/submissions.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'templates', component: TemplatesComponent },
  { path: 'submissions', component: SubmissionsComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
