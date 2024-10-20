import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rls-switch',
  standalone: true,
  templateUrl: 'switch.component.html',
  styleUrls: ['switch.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsSwitchComponent {
  @Input()
  public checked = false;

  @Input()
  public disabled = false;
}
