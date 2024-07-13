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

type PasswordType = 'password' | 'text';

@Component({
  selector: 'rls-input-password',
  standalone: true,
  templateUrl: 'input-password.component.html',
  styleUrls: ['input-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RlsInputPasswordComponent implements OnInit, OnDestroy {
  @Input()
  public formControl?: FormControl<string>;

  @Input()
  public type: PasswordType = 'password';

  @Input()
  public placeholder = '';

  @Input()
  public readonly = false;

  @Input()
  public disabled = false;

  @Output()
  public value: EventEmitter<string>;

  protected unsubscription?: Unsubscription;

  protected input = signal<string>('');

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

  public get focusedInput(): boolean {
    return this.formControl?.focused || this.focused;
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

    if (this.formControl) {
      this.formControl.setState(value);
    } else {
      this.input.set(value);
    }

    this.value.emit(value);
  }
}
