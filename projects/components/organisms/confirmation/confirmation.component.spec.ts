import { TestBed } from '@angular/core/testing';

import { RlsConfirmationComponent } from './confirmation.component';

describe('RlsConfirmationComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [RlsConfirmationComponent] })
  );

  it('should render', () => {
    const fixture = TestBed.createComponent(RlsConfirmationComponent);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.rls-confirmation__component')
    ).toBeTruthy();
  });

  it('should show settings after execute', () => {
    const fixture = TestBed.createComponent(RlsConfirmationComponent);
    fixture.detectChanges();

    let approved = false;

    fixture.componentInstance.execute({
      title: 'Confirm action',
      message: 'Are you sure?',
      approve: {
        label: 'Yes',
        click: () => {
          approved = true;
        }
      }
    });
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector(
      '.rls-confirmation__title'
    );

    expect(title.textContent).toContain('Confirm action');

    const approve: HTMLButtonElement = fixture.nativeElement.querySelector(
      '#btn_confirmation_approve'
    );

    approve.click();

    expect(approved).toBeTrue();
  });
});
