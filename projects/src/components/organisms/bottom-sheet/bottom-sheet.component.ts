import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { OnPortalContainer } from '../../../types';

@Component({
  selector: 'rls-bottom-sheet',
  standalone: true,
  templateUrl: 'bottom-sheet.component.html',
  styleUrls: ['bottom-sheet.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, OverlayModule]
})
export class RlsBottomSheetComponent implements OnPortalContainer {
  @Input()
  public visible = false;

  @Output()
  public visibleChange: EventEmitter<boolean>;

  private declare component: HTMLDivElement | null;

  public autoclose = true;

  constructor(private ref: ElementRef<HTMLElement>) {
    this.visibleChange = new EventEmitter();
  }

  public open(delayInMs = 0): void {
    setTimeout(() => {
      this.changeVisible(true);
    }, delayInMs);
  }

  public close(delayInMs = 0): void {
    setTimeout(() => {
      this.changeVisible(false);
    }, delayInMs);
  }

  public append<T extends HTMLElement = HTMLElement>(children: T): void {
    this.component = this.ref.nativeElement.querySelector<HTMLDivElement>(
      '.rls-bottom-sheet__component'
    );

    this.component?.appendChild(children);
  }

  public onBackdrop(): void {
    if (this.autoclose) {
      this.close();
    }
  }

  private changeVisible(visible: boolean): void {
    this.visible = visible;
    this.visibleChange.emit(visible);
  }
}
