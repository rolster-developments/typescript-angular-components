import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rls-progress-bar',
  standalone: true,
  templateUrl: 'progress-bar.component.html',
  styleUrls: ['progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsProgressBarComponent {
  @Input()
  public percentage = 0;

  @Input()
  public indeterminate = false;

  protected get width(): string {
    return `${this.percentage}%`;
  }
}
