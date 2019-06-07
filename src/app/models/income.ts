import { IncomeType } from './income-type.enum';
import { FilingStatus } from './filing-status.enum';
import { Expense } from './expense';
import { PayFrequency } from './pay-frequency.enum';

export interface Income {
    id: number;
    name: string;
    incomeType: IncomeType;
    payFrequecy: PayFrequency;
    grossIncome: number;
    netIncome: number;
    salary: number;
    wage: number;
    hoursWorked: number;
    filingStatus: FilingStatus;
    exemptions: number;
    preTaxExpenses: Expense[];
    totalExpenses: number;
    incomeAfterExpenses: number;

    calculate(): number;
}
