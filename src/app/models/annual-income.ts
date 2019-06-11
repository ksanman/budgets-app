//import { Income } from './income';
import { IncomeType} from "./income-type.enum";
import { FilingStatus } from './filing-status.enum';
import { Expense } from './expense';
import { PayFrequency } from './pay-frequency.enum';
import { ExpenseType } from './expense-type.enum';

export class Income {// implements Income{
    payFrequecy: PayFrequency;
    incomeAfterExpenses: number;
    netIncome: number;
    totalExpenses: number;
    id: number;
    name: string;
    incomeType: IncomeType;
    grossIncome: number;
    salary: number;
    wage: number;
    hoursWorked: number;
    filingStatus: FilingStatus;
    exemptions: number;
    preTaxExpenses: Expense[] = [];

    constructor() {
      this.payFrequecy = PayFrequency.Annual;
      this.salary = 0.00;
      this.wage = 0.00;
      this.hoursWorked = 0;
      this.filingStatus = FilingStatus.Single;
      this.exemptions = 0;
    }

    calculate(): number {
        this.incomeAfterExpenses = 0;
        if (this.incomeType === "1") {
            this.grossIncome = this.salary;
        } else if (this.incomeType === "2") {
            this.grossIncome = this.wage * this.hoursWorked;
        } else {
          return 0;
        }

        if (!this.grossIncome || this.grossIncome === 0) {
          return 0;
        }

        this.netIncome = this.getNetIncome();
        this.totalExpenses = 0;
        this.preTaxExpenses.forEach(e => {
          if (e.expenseType === 1 || e.expenseType === "1") {
            this.totalExpenses += e.amount;
          } else if (e.expenseType === "2") {
            this.totalExpenses += this.grossIncome * (e.amount / 100);
          } else {
            this.totalExpenses += this.netIncome * (e.amount / 100);
          }
        });
        this.incomeAfterExpenses = this.netIncome - this.totalExpenses;
        return this.incomeAfterExpenses;
    }

    private getNetIncome(): number {
        const taxableIncome = this.getTaxableIncome();
        const federalTax = this.getFederalTax(taxableIncome);
        const stateTax = this.getStateTax(taxableIncome);
        const socialSecurity = this.getSocialSecurity();
        const medicare = this.getMedicare();
        return this.grossIncome - federalTax - stateTax - socialSecurity - medicare;
    }

    private getMedicare(): number {
        return this.grossIncome * 0.0145;
    }

    private getStateTax(taxableIncome: number): number {
        return taxableIncome * 0.0495;
    }

    private getFederalTax(taxableIncome: number): number {
        if (this.filingStatus === FilingStatus['Married filing jointly']) {
            return this.getJointTax(taxableIncome);
        }

        return this.getSingleFilerTax(taxableIncome);
    }

    private getJointTax(income: number) {
        if (income < 18451) {
          return income * .10;
        } else if (income < 74901) {
          return 1845 + ((income - 18451) * .15);
        } else if (income < 151201) {
          return 10312.50 + ((income - 74900) * .25);
        } else if (income < 230451) {
          return 29387.50 + ((income - 151200) * .28);
        } else if (income < 411501) {
          return 51577.50 + ((income - 230450) * .33);
        } else if (income < 464851) {
          return 111324 + ((income - 411500) * .35);
        } else {
          return 129996.50 + ((income - 464850) * .396);
        }
      }

      private getSingleFilerTax(income: number) {
        if (income < 9226) {
          return income * .10;
        } else if (income < 37450) {
          return 922.50 + ((income - 9225) * .15);
        } else if (income < 90751) {
          return 5156.25 + ((income - 37450) * .25);
        } else if (income < 189301) {
          return 18481.25 + ((income - 90750) * .28);
        } else if (income < 411500) {
          return 46075.25 + ((income - 189300) * .33);
        } else if (income < 413201) {
          return 119401.25 + ((income - 411500) * .35);
        } else {
          return 119996.25 + ((income - 413201) * .396);
        }
      }

      getStandardDeduction(): number {
        switch (this.filingStatus) {
          case '2' : return 12600;
          case '3' : return 6300;
          case '4' : return 9250;
          case '5' : return 12600;
          default: return 6300;
        }
      }

    private getTaxableIncome(): number {
      const exemptionAmount = this.exemptions * 4000;
      const exemptedIncome = this.grossIncome - exemptionAmount;
      return exemptedIncome - this.getStandardDeduction();
    }

    private getSocialSecurity(): number {
        return (this.grossIncome > 118500) ? 118500 * 0.062 : this.grossIncome  *  0.062;
    }

}
