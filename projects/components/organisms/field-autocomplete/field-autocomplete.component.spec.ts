import { TestBed } from '@angular/core/testing';
import { formControl } from '@rolster/angular-forms';
import { AutocompleteElement } from '@rolster/components';

import { RlsFieldAutocompleteComponent } from './field-autocomplete.component';

function createSuggestion(
  value: number,
  description: string
): AutocompleteElement<number> {
  return {
    value,
    description,
    title: description,
    compareTo: (other: number) => other === value,
    filtrable: () => true,
    coincidence: (pattern: string) =>
      description.toLowerCase().includes(pattern.toLowerCase())
  };
}

const SUGGESTIONS = [createSuggestion(1, 'One'), createSuggestion(2, 'Two')];

describe('RlsFieldAutocompleteComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RlsFieldAutocompleteComponent]
    })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsFieldAutocompleteComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-field-autocomplete')
    ).toBeTruthy();
  });

  it('should reflect the formControl value and state', () => {
    const control = formControl<number | undefined>(1);
    const fixture = TestBed.createComponent(RlsFieldAutocompleteComponent);
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
    const fixture = TestBed.createComponent(RlsFieldAutocompleteComponent);
    fixture.componentRef.setInput('suggestions', SUGGESTIONS);
    fixture.componentRef.setInput('formControl', control);
    fixture.detectChanges();

    const search: HTMLInputElement = fixture.nativeElement.querySelector(
      '.rls-field-list__ul__control'
    );

    search.value = 'tw';
    search.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const elements = fixture.nativeElement.querySelectorAll(
      '.rls-field-list__element'
    );

    expect(elements.length).toBe(1);

    (elements[0] as HTMLLIElement).click();

    expect(control.value()).toBe(2);
    expect(control.touched()).toBeTrue();
  });
});
