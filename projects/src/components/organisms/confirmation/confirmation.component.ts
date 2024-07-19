import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  protected settings?: ModalConfirmationOptions;

  constructor(private ref: ElementRef<HTMLElement>) {}

  public execute(settings: ModalConfirmationOptions): void {
    if (settings.opening) {
      settings.opening();
    }

    this.settings = settings;

    this.ref.nativeElement.classList.add('visible');
  }

  protected onApprove(): void {
    if (this.settings) {
      const { approve, closing } = this.settings;

      this.hide();

      if (approve && approve.click) {
        approve.click();
      }

      if (closing) {
        closing(); // Execute post accept
      }
    }
  }

  protected onReject(): void {
    if (this.settings) {
      const { reject, closing } = this.settings;

      this.hide();

      if (reject && reject.click) {
        reject.click();
      }

      if (closing) {
        closing(); // Execute post decline
      }
    }
  }

  private hide(): void {
    this.ref.nativeElement.classList.remove('visible');
  }
}
