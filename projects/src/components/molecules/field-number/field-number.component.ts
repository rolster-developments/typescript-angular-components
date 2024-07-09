import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@rolster/angular-forms';
import { RlsInputNumberComponent } from '../../atoms';
import { RlsMessageFormErrorComponent } from '../message-form-error/message-form-error.component';

@Component({
  selector: 'rls-field-number',
  standalone: true,
  templateUrl: 'field-number.component.html',
  styleUrls: ['field-number.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [RlsInputNumberComponent, RlsMessageFormErrorComponent]
})
export class RlsFieldNumberComponent {
  @Input()
  public formControl?: FormControl<number>;

  @Input()
  public label = true;

  @Input()
  public placeholder = '';

  @Input()
  public readonly = false;

  @Input()
  public disabled = false;

  @Output()
  public value: EventEmitter<string>;

  constructor() {
    this.value = new EventEmitter();
  }

  public get disabledInput(): boolean {
    return this.formControl?.disabled || this.disabled;
  }

  public onValue(value: string): void {
    this.value.emit(value);
  }
}
