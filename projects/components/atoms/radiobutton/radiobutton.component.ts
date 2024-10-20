import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rls-radiobutton',
  standalone: true,
  templateUrl: 'radiobutton.component.html',
  styleUrls: ['radiobutton.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsRadiobuttonComponent {
  @Input()
  public checked = false;

  @Input()
  public disabled = false;
}
