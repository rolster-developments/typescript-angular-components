import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  input,
  model,
  ViewEncapsulation
} from '@angular/core';
import { OnPortalContainer, RlsPortalContainerPrivate } from '../../../types';

@Component({
  selector: 'rls-bottom-sheet',
  standalone: true,
  templateUrl: 'bottom-sheet.component.html',
  styleUrls: ['bottom-sheet.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, OverlayModule]
})
export class RlsBottomSheetComponent implements OnPortalContainer {
  public visible = model(false);

  public autoclose = input(true);

  declare private component: HTMLDivElement | null;

  private portal?: RlsPortalContainerPrivate;

  constructor(private ref: ElementRef<HTMLElement>) {}

  protected onBackdrop(): void {
    if (this.autoclose()) {
      this.close();
    }
  }

  public open(delayInMs = 0): void {
    setTimeout(() => {
      this.visible.set(true);
    }, delayInMs);
  }

  public close(delayInMs = 0): void {
    setTimeout(() => {
      this.visible.set(false);
      this.portal?.reject();
    }, delayInMs);
  }

  public append<T extends HTMLElement = HTMLElement>(children: T): void {
    this.component = this.ref.nativeElement.querySelector<HTMLDivElement>(
      '.rls-bottom-sheet__component'
    );

    this.component?.appendChild(children);
  }

  public ngPortal(portal: RlsPortalContainerPrivate): void {
    this.portal = portal;
  }
}
