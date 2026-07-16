import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';

import { RlsPickerDateComponent } from './picker-date.component';

describe('RlsPickerDateComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsPickerDateComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsPickerDateComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-picker-date')
    ).toBeTruthy();
  });

  it('should reflect the formControl value and state', () => {
    const control = formControl<Date | undefined>(new Date(2025, 5, 15));
    const fixture = TestBed.createComponent(RlsPickerDateComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const year = fixture.nativeElement.querySelector(
      '.rls-picker-date__title--year span'
    );
    const title = fixture.nativeElement.querySelector(
      '.rls-picker-date__title--description span'
    );

    expect(year.textContent.trim()).toBe('2025');
    expect(title.textContent).toContain('2025');

    control.setValue(new Date(2030, 0, 1));
    fixture.detectChanges();

    expect(title.textContent).toContain('2030');
  });

  it('should invoke control methods on user events', () => {
    const control = formControl<Date | undefined>(undefined);
    const fixture = TestBed.createComponent(RlsPickerDateComponent);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const todayButton = fixture.nativeElement.querySelector(
      '.rls-picker-date__actions--today button'
    );

    todayButton.click();

    expect(control.value()).toBeInstanceOf(Date);
  });
});
