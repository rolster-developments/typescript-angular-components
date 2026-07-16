import { TestBed } from '@angular/core/testing';

import { RlsModalComponent } from './modal.component';

describe('RlsModalComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsModalComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsModalComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.rls-modal')).toBeTruthy();
  });

  it('should reflect the visible input', () => {
    const fixture = TestBed.createComponent(RlsModalComponent);
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-modal--visible')
    ).toBeTruthy();
  });
});
