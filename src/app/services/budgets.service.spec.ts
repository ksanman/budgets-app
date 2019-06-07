/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BudgetsService } from './budgets.service';

describe('Service: Budgets', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BudgetsService]
    });
  });

  it('should ...', inject([BudgetsService], (service: BudgetsService) => {
    expect(service).toBeTruthy();
  }));
});
