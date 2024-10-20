import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'rls-icon',
  standalone: true,
  templateUrl: 'icon.component.html',
  styleUrls: ['icon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsIconComponent implements OnChanges {
  @Input()
  public value = '';

  @Input()
  public skeleton = false;

  protected className = '';

  public ngOnChanges(changes: SimpleChanges): void {
    const { value } = changes;

    if (value?.currentValue) {
      this.className = `rls-icon-${value.currentValue}`;
    }
  }
}
