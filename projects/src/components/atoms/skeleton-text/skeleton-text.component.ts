import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RlsSkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'rls-skeleton-text',
  standalone: true,
  templateUrl: 'skeleton-text.component.html',
  styleUrls: ['skeleton-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [RlsSkeletonComponent]
})
export class RlsSkeletonTextComponent {
  @Input()
  public active = false;
}
