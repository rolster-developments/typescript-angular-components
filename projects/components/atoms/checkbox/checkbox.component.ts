import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rls-checkbox',
  standalone: true,
  templateUrl: 'checkbox.component.html',
  styleUrls: ['checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsCheckboxComponent {
  @Input()
  public checked = false;

  @Input()
  public disabled = false;
}
