import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Budget } from '../models/budget';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private budgetsUrl = 'api/budgets'; 

  constructor(private http: HttpClient) { }

  getBudgets (): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.budgetsUrl)
      .pipe(
        catchError(this.handleError('getBudgets', []))
      );
  }

  getBudget(id: number): Observable<Budget> {
    const url = `${this.budgetsUrl}/${id}`;
    return this.http.get<Budget>(url).pipe(catchError(this.handleError<Budget>(`getBudget id=${id}`)));
  }

  /** POST: add a new budget to the server */
  addBudget (budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(this.budgetsUrl, budget, this.httpOptions).pipe(catchError(this.handleError<Budget>('addBudget')));
  }

  /** DELETE: delete the budget from the server */
  deleteBudget (budget: Budget | number): Observable<Budget> {
    const id = typeof budget === 'number' ? budget : budget.id;
    const url = `${this.budgetsUrl}/${id}`;
    return this.http.delete<Budget>(url, this.httpOptions).pipe(catchError(this.handleError<Budget>('deleteBudget')));
  }

  /** PUT: update the budget on the server */
  updateBudget (budget: Budget): Observable<any> {
    return this.http.put(this.budgetsUrl, budget, this.httpOptions).pipe(catchError(this.handleError<any>('updateBudget')));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
