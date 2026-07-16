import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';
import { PickerListenerEvent } from '@rolster/components';
import { DateRange } from '@rolster/dates';

import { RlsPickerDateRangeComponent } from './picker-date-range.component';

describe('RlsPickerDateRangeComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsPickerDateRangeComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsPickerDateRangeComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-picker-date-range')
    ).toBeTruthy();
  });

  it('should reflect the current date in the header', () => {
    const fixture = TestBed.createComponent(RlsPickerDateRangeComponent);
    fixture.detectChanges();

    const year = fixture.nativeElement.querySelector(
      '.rls-picker-date-range__title--year span'
    );

    expect(year.textContent.trim()).toBe(String(new Date().getFullYear()));
  });

  it('should invoke control methods and emit listener on select', () => {
    const control = formControl<DateRange | undefined>(undefined);
    const fixture = TestBed.createComponent(RlsPickerDateRangeComponent);
    fixture.componentRef.setInput('formControl', control);

    const events: PickerListenerEvent[] = [];
    fixture.componentInstance.listener.subscribe((listener) => {
      events.push(listener.event);
    });

    fixture.detectChanges();

    const okButton = fixture.nativeElement.querySelector(
      '.rls-picker-date-range__actions--ok button'
    );

    okButton.click();

    expect(control.value()).toBeInstanceOf(DateRange);
    expect(events).toEqual([PickerListenerEvent.Select]);
  });
});
