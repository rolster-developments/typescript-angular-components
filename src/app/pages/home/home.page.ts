import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormControl } from '@rolster/angular-forms';
import { required } from '@rolster/validators/helpers';
import {
  RlsBottomSheetService,
  RlsConfirmationService,
  RlsModalService
} from '../../../../projects/src';
import { OnPortal, RlsPortalPrivate } from '../../../../projects/src/types';

@Component({
  selector: 'rls-portal',
  template: `<div>
    <div class="rls-title-regular" (click)="onEmit()">
      Daniel Castillo Pedroza
    </div>
    <div class="rls-title-regular">Adrian Castillo Pedroza</div>
    <div class="rls-title-regular">Fabian Castillo Pedroza</div>
  </div>`
})
class RlsComponentPortal implements OnPortal<string> {
  private portal?: RlsPortalPrivate<string>;

  onEmit() {
    this.portal?.resolve('Daniel');
    this.portal?.destroy();
  }

  public ngPortal(portal: RlsPortalPrivate<string>): void {
    this.portal = portal;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage {
  protected formControl = new FormControl<string>('Daniel Castillo', [
    required
  ]);

  protected formNumber = new FormControl<number>(30, [required]);

  protected formRadiobutton = new FormControl<string>();

  protected name = signal('Daniel');

  protected active = false;

  constructor(
    private bottomSheetService: RlsBottomSheetService,
    private confirmationService: RlsConfirmationService,
    private modalService: RlsModalService
  ) {}

  public onClick(): void {
    this.active = !this.active;
    this.formControl.setState('Adrian Castillo');
    this.name.set('Adrian');

    this.confirmationService.execute({
      message: '¿Deseas realizar el registro del usuario en la Aplicación?',
      title: 'Rolster Developers',
      subtitle: 'Daniel Andres Castillo Pedroza',
      approve: {
        label: 'Aceptar'
      },
      reject: {
        label: 'Cancelar',
        theme: 'danger'
      }
    });
  }

  public onBottomSheet(): void {
    const sheet = this.modalService.create(RlsComponentPortal);

    sheet.open();

    sheet.waiting().then((data) => {
      console.log(data);
    });
  }
}
