import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  signal,
  ViewEncapsulation
} from '@angular/core';

import { ModalConfirmationOptions } from '../../../models';
import { RlsButtonComponent } from '../../atoms';

@Component({
  selector: 'rls-confirmation',
  standalone: true,
  templateUrl: 'confirmation.component.html',
  styleUrls: ['confirmation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RlsButtonComponent]
})
export class RlsConfirmationComponent {
  protected settings = signal<ModalConfirmationOptions | undefined>(undefined);

  constructor(private ref: ElementRef<HTMLElement>) {}

  public execute(settings: ModalConfirmationOptions): void {
    settings.opening?.();

    this.settings.set(settings);

    this.ref.nativeElement.classList.add('visible');
  }

  protected onApprove(): void {
    const settings = this.settings();

    if (settings) {
      const { approve, closing } = settings;

      this.hide();

      approve?.click?.();
      closing?.();
    }
  }

  protected onReject(): void {
    const settings = this.settings();

    if (settings) {
      const { reject, closing } = settings;

      this.hide();

      reject?.click?.();
      closing?.();
    }
  }

  private hide(): void {
    this.ref.nativeElement.classList.remove('visible');
  }
}
