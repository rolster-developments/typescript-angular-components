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

@Component({
  selector: 'rls-input-number',
  standalone: true,
  templateUrl: 'input-number.component.html',
  styleUrls: ['input-number.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [RlsInputComponent]
})
export class RlsInputNumberComponent {
  @Input()
  public formControl?: FormControl<number>;

  @Input()
  public placeholder = '';

  @Input()
  public readonly = false;

  @Input()
  public disabled = false;

  @Output()
  public value: EventEmitter<string>;

  protected input = signal<string>('');

  constructor() {
    this.value = new EventEmitter();
  }

  public onValue(value: string): void {
    this.input.set(value);
    this.value.emit(value);
  }
}
