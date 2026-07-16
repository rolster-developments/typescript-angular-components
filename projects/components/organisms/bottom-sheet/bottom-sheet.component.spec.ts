import { TestBed } from '@angular/core/testing';

import { RlsBottomSheetComponent } from './bottom-sheet.component';

describe('RlsBottomSheetComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsBottomSheetComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsBottomSheetComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-bottom-sheet')
    ).toBeTruthy();
  });

  it('should reflect the visible input', () => {
    const fixture = TestBed.createComponent(RlsBottomSheetComponent);
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-bottom-sheet--visible')
    ).toBeTruthy();
  });
});
