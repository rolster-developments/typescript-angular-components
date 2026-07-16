import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';
import { DateRange } from '@rolster/dates';

import { RlsFieldDateRangeComponent } from './field-date-range.component';

describe('RlsFieldDateRangeComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsFieldDateRangeComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsFieldDateRangeComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-field-date-range')
    ).toBeTruthy();
  });

  it('should reflect the formControl value and state', () => {
    const range = new DateRange(new Date(2025, 5, 10), new Date(2025, 5, 20));
    const control = formControl<DateRange | undefined>(range);
    const fixture = TestBed.createComponent(RlsFieldDateRangeComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement = fixture.nativeElement.querySelector(
      '.rls-field-date-range__control'
    );

    expect(el.value).toBe('10/Jun/2025 - 20/Jun/2025');

    control.disable();
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-field-box--disabled')
    ).toBeTruthy();
  });

  it('should invoke control methods on user events', () => {
    const range = new DateRange(new Date(2025, 5, 10), new Date(2025, 5, 20));
    const control = formControl<DateRange | undefined>(range);
    const fixture = TestBed.createComponent(RlsFieldDateRangeComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const action: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.rls-field-date-range__action'
    );

    action.click();

    expect(control.value()).toBeUndefined();
    expect(control.touched()).toBeTrue();
  });
});
