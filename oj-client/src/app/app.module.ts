import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProblemListComponent } from './component/problem-list/problem-list.component';
import { ProblemDetailComponent } from './component/problem-detail/problem-detail.component';
import { AddProblemComponent } from './component/add-problem/add-problem.component';
import {DataService} from './services/data.service';
import {routing} from './app.routes';
import {FormsModule} from '@angular/forms';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    AddProblemComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [{
    provide: 'data',
    useClass: DataService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
