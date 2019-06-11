import { Component, OnInit, Input } from '@angular/core';
import { Budget } from '../models/budget';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { BudgetPeriod } from '../models/budget-period.enum';
import { IncomeType } from '../models/income-type.enum';
import { FilingStatus } from '../models/filing-status.enum';
import { ExpenseType } from '../models/expense-type.enum';
// import { Income } from '../models/income';
import { Expense } from '../models/expense';
import { BudgetsService } from '../services/budgets.service';
import { Income } from '../models/annual-income';
import { PayFrequency } from '../models/pay-frequency.enum';

@Component({
  selector: 'app-budgets-editor',
  templateUrl: './budgets-editor.component.html',
  styleUrls: ['./budgets-editor.component.css']
})
export class BudgetsEditorComponent implements OnInit {

  @Input() public budget: Budget;

  public budgetFrequencyKeys: any[];
  public budgetFrequencies = BudgetPeriod;

  public incomeTypeKeys: any[];
  public incomeTypes = IncomeType;

  public filingStatusKeys: any[];
  public filingStatuses = FilingStatus;

  public expenseKeys: any[];
  public expenseTypes = ExpenseType;

  public payFrequencyKeys: any[];
  public payFrequencies = PayFrequency;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private budgetService: BudgetsService) {
    this.budgetFrequencyKeys = Object.keys(this.budgetFrequencies).filter(f => !isNaN(Number(f))).map(k => parseInt(k));
    this.incomeTypeKeys = Object.keys(this.incomeTypes).filter(f => !isNaN(Number(f))).map(k => parseInt(k));
    this.filingStatusKeys = Object.keys(this.filingStatuses).filter(f => !isNaN(Number(f))).map(k => parseInt(k));
    this.expenseKeys = Object.keys(this.expenseTypes).filter(f => !isNaN(Number(f))).map(k => parseInt(k));
    this.payFrequencyKeys = Object.keys(this.payFrequencies).filter(f => !isNaN(Number(f))).map(k => parseInt(k));
    }

  ngOnInit() {
    this.budget = new Budget(this.budget.id, this.budget.name, this.budget.budgetPeriod, this.budget.incomes, this.budget.expenses);
  }

  onSubmit() {
    if (this.budget.id !== 0) {
      this.budgetService.updateBudget(this.budget).subscribe();
    } else {
      this.budgetService.addBudget(this.budget)
      .subscribe(b => this.budget = new Budget(b.id, b.name, b.budgetPeriod, b.incomes, b.expenses));
    }

    this.activeModal.close(this.budget);
  }

  addIncome() {
    this.budget.incomes.push(new Income());
  }

  deleteIncome(income: Income) {
    this.budget.incomes = this.budget.incomes.filter(i => i !== income);
  }

  addPreTaxExpense(income: Income) {
    this.budget.incomes.find(i => i === income).preTaxExpenses.push(new Expense());
  }

  deletePreTaxExpense(income: Income, expense: Expense) {
    this.budget.incomes.find(i => i === income).preTaxExpenses = this.budget.incomes.find(i => i === income).preTaxExpenses
    .filter(e => e !== expense);
  }

  addExpense() {
    this.budget.expenses.push(new Expense());
  }

  deleteExpense(expense: Expense) {
    this.budget.expenses = this.budget.expenses.filter(e => e !== expense);
  }

  get balance(): number {
    return this.budget.balance;
  }
}
