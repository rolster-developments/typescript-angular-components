import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rls-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsIconComponent {
  @Input()
  public value = '';

  @Input()
  public skeleton = false;

  protected get className(): string {
    return `rls-icon-${this.value}`;
  }
}
