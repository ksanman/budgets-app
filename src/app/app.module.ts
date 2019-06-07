import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { BudgetsEditorComponent } from './budgets-editor/budgets-editor.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { InMemoryDataService } from './services/in-memory-data.service';
import { BudgetsService } from './services/budgets.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BudgetsComponent,
    BudgetsEditorComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false}),
    NgbModule.forRoot(),
    RouterModule
  ],
  providers: [BudgetsService, InMemoryDataService],
  bootstrap: [AppComponent],
  entryComponents: [BudgetsEditorComponent]
})
export class AppModule { }
