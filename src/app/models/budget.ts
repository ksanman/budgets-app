import { BudgetPeriod } from './budget-period.enum';
import { Income } from './annual-income';
import { Expense } from './expense';
import { ExpenseType } from './expense-type.enum';

export class Budget {

    constructor(
        public id: number,
        public name: string,
        public budgetPeriod: BudgetPeriod,
        public incomes: Income[],
        public expenses: Expense[]
    ) { }

    get balance(): number {
        let b = 0;
        let totalGross = 0;
        let totalNet = 0;
        for (const income of this.incomes) {
            b += income.calculate();
            totalGross += income.grossIncome;
            totalNet += income.netIncome;
        }
        let totalExpenses = 0;
        for (const expense of this.expenses) {
          if (expense.expenseType === 1 || expense.expenseType === "1") {
            totalExpenses += expense.amount;
          } else if (expense.expenseType === "2") {
            totalExpenses += totalGross * (expense.amount / 100);
          } else {
            totalExpenses += totalNet * (expense.amount / 100);
          }
        }
        return b - totalExpenses;
    }
}
