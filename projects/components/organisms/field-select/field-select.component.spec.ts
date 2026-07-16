import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';
import { ListElement } from '@rolster/components';

import { RlsFieldSelectComponent } from './field-select.component';

function createSuggestion(
  value: number,
  description: string
): ListElement<number> {
  return {
    value,
    description,
    title: description,
    compareTo: (other: number) => other === value,
    filtrable: () => true
  };
}

const SUGGESTIONS = [createSuggestion(1, 'One'), createSuggestion(2, 'Two')];

describe('RlsFieldSelectComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsFieldSelectComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsFieldSelectComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-field-select')
    ).toBeTruthy();
  });

  it('should reflect the formControl value and state', () => {
    const control = formControl<number | undefined>(1);
    const fixture = TestBed.createComponent(RlsFieldSelectComponent);
    fixture.componentRef.setInput('suggestions', SUGGESTIONS);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const el: HTMLInputElement = fixture.nativeElement.querySelector(
      '.rls-field-list__control'
    );

    expect(el.value).toBe('One');

    control.setValue(2);
    fixture.detectChanges();

    expect(el.value).toBe('Two');
  });

  it('should invoke control methods on user events', () => {
    const control = formControl<number | undefined>(undefined);
    const fixture = TestBed.createComponent(RlsFieldSelectComponent);
    fixture.componentRef.setInput('suggestions', SUGGESTIONS);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const elements = fixture.nativeElement.querySelectorAll(
      '.rls-field-list__element'
    );

    (elements[1] as HTMLLIElement).click();

    expect(control.value()).toBe(2);
    expect(control.touched()).toBeTrue();
  });
});
