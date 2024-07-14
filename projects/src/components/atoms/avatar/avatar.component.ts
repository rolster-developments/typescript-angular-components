import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rls-avatar',
  standalone: true,
  templateUrl: 'avatar.component.html',
  styleUrls: ['avatar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsAvatarComponent {
  @Input()
  public rounded = false;

  @Input()
  public skeleton = false;
}
