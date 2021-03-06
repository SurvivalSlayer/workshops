import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { CodelabComponent } from './codelab/codelab.component';
import { ResumeDialogComponent } from './codelab/resume-dialog.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { MarkdownParserService } from './markdown-parser.service';
import { CodelabsComponent } from './codelabs/codelabs.component';
import { FilterPipe } from './filter.pipe';
import { ApplicationService } from './services/application.service';
import { StatusPipe } from './status.pipe';

/**
 * Fetch the application configuration before bootstraping Angular.
 *
 * @param ApplicationService The application initializer service that will fetch the application configuration.
 */
export function appInitialiser(appService: ApplicationService) {
  return () => appService.initializeApp();
}

const routes: Routes = [
  {
    path: '',
    component: CodelabsComponent
  },
  {
    path: ':id',
    component: CodelabComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CodelabComponent,
    CodelabsComponent,
    ResumeDialogComponent,
    FilterPipe,
    StatusPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
      useHash: true
    }),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    FlexLayoutModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false
        }
      }
    }),
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [
    MarkdownParserService,
    ApplicationService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitialiser,
      deps: [ApplicationService],
      multi: true
    }
  ],
  entryComponents: [ResumeDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
