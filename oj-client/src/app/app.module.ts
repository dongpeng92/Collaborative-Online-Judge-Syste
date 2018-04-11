import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProblemListComponent } from './component/problem-list/problem-list.component';
import { ProblemDetailComponent } from './component/problem-detail/problem-detail.component';
import { AddProblemComponent } from './component/add-problem/add-problem.component';
import {DataService} from './services/data.service';
import {routing} from './app.routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HttpClientModule } from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import { CallbackComponent } from './component/callback/callback.component';
import { ProfileComponent } from './component/profile/profile.component';
import {AuthGuardService} from "./services/auth-guard.service";
import { EditorComponent } from './component/editor/editor.component';
import {CollaborationService} from "./services/collaboration.service";
import {SearchPipe} from "./pipes/search.pipe";
import {InputService} from "./services/input.service";

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    AddProblemComponent,
    NavbarComponent,
    CallbackComponent,
    ProfileComponent,
    EditorComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  providers: [{
    provide: 'data',
    useClass: DataService
  },{
    provide: 'auth',
    useClass: AuthService
  },AuthGuardService, {
    provide: 'collaboration',
    useClass: CollaborationService
  },{
    provide: 'input',
    useClass: InputService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
