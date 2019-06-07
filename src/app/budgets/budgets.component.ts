import { Component, OnInit } from '@angular/core';
import { BudgetsService } from '../services/budgets.service';
import {Budget} from '../models/budget';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BudgetsEditorComponent } from '../budgets-editor/budgets-editor.component';
import { BudgetPeriod } from '../models/budget-period.enum';
//import { Income } from '../models/income';
import { Income } from '../models/annual-income';
import { IncomeType } from '../models/income-type.enum';
import { Expense } from '../models/expense';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  budgets: Budget[] = [];
  nameForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)])
  });
  constructor(
    private budgetService: BudgetsService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getBudgets();
  }

  getBudgets() {
      return this.budgetService.getBudgets()
      .subscribe(budgets => budgets.forEach(b => {
        let incomes = this.getIncomes(b.incomes);
        let expenses = this.getExpenses(b.expenses);
        this.budgets.push(new Budget(b.id, b.name, b.budgetPeriod, incomes, expenses))}
        ));
  }

  getIncomes(incomes: Income[]){
    let newIncomes = [];
    for(let income of incomes){
      let newIncome = Object.assign(new Income(), income);
      newIncome.preTaxExpenses = this.getExpenses(newIncome.preTaxExpenses);
      newIncomes.push(newIncome);
    }
    return newIncomes;
  }

  getExpenses(expenses: Expense[]){
    let newExpenses = [];

    for(let expense of expenses){
      let newExpense = Object.assign(new Expense(), expense);
      newExpenses.push(newExpense);
    }

    return newExpenses;
  }

  update(budget: Budget) {
    const modalRef = this.modalService.open(BudgetsEditorComponent, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
    modalRef.componentInstance.budget = budget;
    modalRef.result.then((result) =>{
      this.getBudgets();
      this.budgets.filter(b => b!== budget);
    });
  }

  delete(budget: Budget) {
    this.budgets = this.budgets.filter(b => b !== budget);
    this.budgetService.deleteBudget(budget).subscribe();
  }

  addBudget(){
    let budget = new Budget(0, '', BudgetPeriod.Monthly, [], []);
    // this.budgetService.addBudget(budget).subscribe(b => {
    //   this.budgets.push(new Budget(b.id, b.name, b.budgetPeriod, b.incomes, b.expenses));
    //   const modalRef = this.modalService.open(BudgetsEditorComponent, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
    //   modalRef.componentInstance.budget = b;
    // });
    const modalRef = this.modalService.open(BudgetsEditorComponent, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
    modalRef.componentInstance.budget = budget;
    modalRef.result.then(result =>{
      console.log(result);
    });
  }
}