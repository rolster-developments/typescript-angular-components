import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  signal
} from '@angular/core';
import { FormControl } from '@rolster/angular-forms';
import { RlsInputComponent } from '../input/input.component';
import { RlsAmountComponent } from '../amount/amount.component';

@Component({
  selector: 'rls-input-money',
  standalone: true,
  templateUrl: 'input-money.component.html',
  styleUrls: ['input-money.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [RlsAmountComponent, RlsInputComponent]
})
export class RlsInputMoneyComponent {
  @Input()
  public formControl?: FormControl<number>;

  @Input()
  public placeholder = '';

  @Input()
  public readonly = false;

  @Input()
  public disabled = false;

  @Input()
  public decimals = false;

  @Input()
  public symbol = '';

  @Output()
  public value: EventEmitter<number>;

  protected input = signal<number>(0);

  constructor() {
    this.value = new EventEmitter();
  }

  public onValue(value: number): void {
    this.input.set(value);
    this.value.emit(value);
  }
}
