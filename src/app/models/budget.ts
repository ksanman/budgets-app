import { BudgetPeriod } from './budget-period.enum';
import { Income } from './annual-income';
import { Expense } from './expense';

export class Budget {
    
    constructor(
        public id: number,
        public name: string,
        public budgetPeriod: BudgetPeriod,
        public incomes: Income[],
        public expenses: Expense[]
    ){ }

    get balance(): number {
        let b = 0;
        // for(let income of this.incomes) {
        //     b += income.calculate();
        // }
        // for(let expense of this.expenses){
        //     b -= expense.amount;
        // }
        return b;
    }

    calculateBalance(): number {
        let b = 0;
        // for(let income of this.incomes) {
        //     b += income.calculate();
        // }
        // for(let expense of this.expenses){
        //     b -= expense.amount;
        // }
        return b;
    }
}