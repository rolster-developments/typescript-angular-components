import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  input,
  OnInit,
  output,
  signal,
  untracked,
  ViewEncapsulation
} from '@angular/core';
import { AngularVoid } from '@rolster/angular-forms';
import { valueIsDefined } from '@rolster/commons';
import {
  PickerListener,
  PickerListenerEvent,
  verifyDateRange
} from '@rolster/components';
import {
  assignDayInDate,
  assignMonthInDate,
  assignYearInDate,
  dateFormatTemplate,
  MONTH_NAMES
} from '@rolster/dates';

import { RlsButtonComponent } from '../../atoms';
import {
  RlsPickerDayComponent,
  RlsPickerMonthComponent,
  RlsPickerMonthTitleComponent,
  RlsPickerYearComponent
} from '../../molecules';
import { PickerDateGroup } from './picker-date.controls';

const FORMAT_TITLE = '{dw}, {mx} {dd} de {yy}';

type Visibility = 'DAY' | 'MONTH' | 'YEAR';

@Component({
  selector: 'rls-picker-date',
  standalone: true,
  templateUrl: 'picker-date.component.html',
  styleUrls: ['picker-date.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RlsButtonComponent,
    RlsPickerDayComponent,
    RlsPickerMonthComponent,
    RlsPickerMonthTitleComponent,
    RlsPickerYearComponent
  ]
})
export class RlsPickerDateComponent implements OnInit {
  public formControl = input<AngularVoid<Date>>();

  public minDate = input<Date | undefined>(undefined);

  public maxDate = input<Date | undefined>(undefined);

  public automatic = input(false);

  public listener = output<PickerListener<Date>>();

  protected value = signal(new Date());

  protected dateGroup: PickerDateGroup;

  protected visibility = signal<Visibility>('DAY');

  protected title = computed(() =>
    dateFormatTemplate(this.value(), FORMAT_TITLE)
  );

  protected year = computed(() => this.value().getFullYear().toString());

  protected month = computed(() => MONTH_NAMES(this.value().getMonth()));

  constructor() {
    this.dateGroup = new PickerDateGroup(this.value());

    effect(() => {
      const year = this.dateGroup.year.value();

      if (valueIsDefined(year)) {
        const currentValue = untracked(this.value);

        if (currentValue.getFullYear() !== year) {
          this.value.set(assignYearInDate(currentValue, year));
          this.visibility.set('DAY');
        }
      }
    });

    effect(() => {
      const month = this.dateGroup.month.value();

      if (valueIsDefined(month)) {
        const currentValue = untracked(this.value);

        if (currentValue.getMonth() !== month) {
          this.value.set(assignMonthInDate(currentValue, month));
          this.visibility.set('DAY');
        }
      }
    });

    effect(() => {
      const day = this.dateGroup.day.value();

      if (valueIsDefined(day)) {
        const currentValue = untracked(this.value);

        if (currentValue.getDate() !== day) {
          const newValue = assignDayInDate(currentValue, day);

          this.value.set(newValue);

          if (untracked(this.automatic)) {
            this.emitDate(newValue);
          }
        }
      }
    });

    effect(() => {
      const value = this.formControl()?.value();

      if (value) {
        this.value.set(value);
      }
    });
  }

  public ngOnInit(): void {
    this.dateGroup.setDate(
      verifyDateRange({
        date: this.formControl()?.data ?? this.value(),
        minDate: this.minDate(),
        maxDate: this.maxDate()
      })
    );
  }

  public onVisibilityDay(): void {
    this.visibility.set('DAY');
  }

  public onVisibilityMonth(): void {
    this.visibility.set('MONTH');
  }

  public onVisibilityYear(): void {
    this.visibility.set('YEAR');
  }

  public onSelect(): void {
    this.emitDate(this.value());
  }

  public onToday(): void {
    const today = new Date(); // Refresh value with Today

    this.dateGroup.setDate(today);
    this.formControl()?.setValue(today);
    this.emitListener(PickerListenerEvent.Now, today);
  }

  public onCancel(): void {
    this.emitListener(PickerListenerEvent.Cancel);
  }

  private emitListener(event: PickerListenerEvent, value?: Date): void {
    this.listener.emit({ event, value });
  }

  private emitDate(value: Date): void {
    this.formControl()?.setValue(value);
    this.emitListener(PickerListenerEvent.Select, value);
  }
}
