import { ExpenseType } from './expense-type.enum';

export class Expense {
    public name: string;
    public expenseType: ExpenseType;
    public amount: number;

    constructor( ){}
}
