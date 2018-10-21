import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { LandingComponent } from './landing/landing.component';
import { TemplatesComponent } from './templates/templates.component';
import { SubmissionsComponent, UploadDialog } from './submissions/submissions.component';
import { SubmissionsService } from './submissions/submissions.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    TemplatesComponent,
    SubmissionsComponent,
    UploadDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    SubmissionsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [UploadDialog]
})
export class AppModule { }
