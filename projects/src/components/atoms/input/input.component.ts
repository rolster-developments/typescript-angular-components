import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
  signal
} from '@angular/core';
import { FormControl } from '@rolster/angular-forms';

type InputType = 'text' | 'number' | 'password' | 'email';

@Component({
  selector: 'rls-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsInputComponent implements OnInit, OnDestroy {
  @Input()
  public formControl?: FormControl<any>;

  @Input()
  public type: InputType = 'text';

  @Input()
  public placeholder = '';

  @Input()
  public readonly = false;

  @Input()
  public disabled = false;

  @Output()
  public value: EventEmitter<any>;

  protected unsubscription?: Unsubscription;

  protected input = signal<any>('');

  protected focused = false;

  constructor() {
    this.value = new EventEmitter();
  }

  public ngOnInit(): void {
    this.unsubscription = this.formControl?.subscribe((value) => {
      this.input.set(String(value));
    });
  }

  public ngOnDestroy(): void {
    if (this.unsubscription) {
      this.unsubscription();
    }
  }

  public get disabledInput(): boolean {
    return this.formControl?.disabled || this.disabled;
  }

  public onFocus(): void {
    this.formControl?.focus();
    this.focused = true;
  }

  public onBlur(): void {
    this.formControl?.blur();
    this.formControl?.touch();
    this.focused = false;
  }

  public onInput(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    const data = this.type === 'number' ? +value : value;

    if (this.formControl) {
      this.formControl.setState(data);
    } else {
      this.input.set(data);
    }

    this.value.emit(data);
  }
}
