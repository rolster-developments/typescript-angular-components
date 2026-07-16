import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';

import { RlsFieldDateComponent } from './field-date.component';

describe('RlsFieldDateComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsFieldDateComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsFieldDateComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.rls-field-date')).toBeTruthy();
  });

  it('should reflect the formControl value and state', () => {
    const control = formControl<Date | undefined>(new Date(2025, 5, 15));
    const fixture = TestBed.createComponent(RlsFieldDateComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement = fixture.nativeElement.querySelector(
      '.rls-field-date__control'
    );

    expect(el.value).toBe('15/Jun/2025');

    control.setValue(new Date(2030, 0, 1));
    fixture.detectChanges();

    expect(el.value).toBe('01/Ene/2030');

    control.disable();
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-field-box--disabled')
    ).toBeTruthy();
  });

  it('should invoke control methods on user events', () => {
    const control = formControl<Date | undefined>(new Date(2025, 5, 15));
    const fixture = TestBed.createComponent(RlsFieldDateComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const action: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.rls-field-date__action'
    );

    action.click();

    expect(control.value()).toBeUndefined();
    expect(control.touched()).toBeTrue();
  });
});
