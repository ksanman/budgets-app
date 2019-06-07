import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb(){
    const budgets = [
        {id: 1, name: 'Budget 1', budgetPeriod: 1, incomes: [], expenses: []}
    ]
    return {budgets}
  }

  genId(budgets: Budget[]): number {
    return budgets.length > 0 ? Math.max(...budgets.map(budget => budget.id)) + 1 : 1;
  }

}
