import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  output,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { AngularVoid } from '@rolster/angular-forms';
import { PickerListener, PickerListenerEvent } from '@rolster/components';
import { dateFormatTemplate } from '@rolster/dates';
import { RlsButtonActionComponent } from '../../atoms';
import { RlsMessageFormErrorComponent } from '../../molecules';
import { RlsModalComponent } from '../modal/modal.component';
import { RlsPickerDateComponent } from '../picker-date/picker-date.component';

@Component({
  selector: 'rls-field-date',
  standalone: true,
  templateUrl: 'field-date.component.html',
  styleUrls: ['field-date.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RlsButtonActionComponent,
    RlsMessageFormErrorComponent,
    RlsPickerDateComponent,
    RlsModalComponent
  ]
})
export class RlsFieldDateComponent {
  public formControl = input<AngularVoid<Date>>();

  public minDate = input<Date | undefined>(undefined);

  public maxDate = input<Date | undefined>(undefined);

  public label = input(true);

  public placeholder = input('');

  public disabled = input(false);

  public format = input('{dd}/{mx}/{yy}');

  public value = output<Date | undefined>();

  private localValue = signal<Date | undefined>(new Date());

  protected currentValue = computed(() => {
    const control = this.formControl();

    return control ? control.value() : this.localValue();
  });

  protected inputValue = computed(() => {
    const value = this.currentValue();

    return value ? dateFormatTemplate(value, this.format()) : '';
  });

  protected disabledInput = computed(
    () => this.formControl()?.disabled() ?? this.disabled()
  );

  protected modalIsVisible = signal(false);

  public onInput(): void {
    this.modalIsVisible.set(true);
  }

  public onAction(): void {
    if (this.currentValue()) {
      this.onChange(undefined);
      this.formControl()?.setValue(undefined);
      this.formControl()?.touch();
    } else {
      this.modalIsVisible.set(true);
    }
  }

  public onListener({ event, value }: PickerListener<Date>): void {
    if (event !== PickerListenerEvent.Cancel) {
      this.onChange(value);
    }

    this.formControl()?.touch();
    this.modalIsVisible.set(false);
  }

  private onChange(value?: Date): void {
    this.localValue.set(value);

    this.value.emit(value);
  }
}
