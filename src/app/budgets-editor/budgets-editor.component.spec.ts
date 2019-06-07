import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsEditorComponent } from './budgets-editor.component';

describe('BudgetsEditorComponent', () => {
  let component: BudgetsEditorComponent;
  let fixture: ComponentFixture<BudgetsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
