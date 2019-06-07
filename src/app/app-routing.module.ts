import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { BudgetsEditorComponent } from './budgets-editor/budgets-editor.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "budgets", component: BudgetsComponent },
  { path: "budgets/:id", component: BudgetsEditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
