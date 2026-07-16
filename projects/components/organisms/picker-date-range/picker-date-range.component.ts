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
  assignMonthInDate,
  assignYearInDate,
  dateFormatTemplate,
  DateRange,
  MONTH_NAMES
} from '@rolster/dates';

import { RlsButtonComponent } from '../../atoms';
import {
  RlsPickerDayRangeComponent,
  RlsPickerMonthComponent,
  RlsPickerMonthTitleComponent,
  RlsPickerYearComponent
} from '../../molecules';
import { PickerDateRangeGroup } from './picker-date-range.controls';

const FORMAT_TITLE = '{dw}, {mx} {dd} de {yy}';

type Visibility = 'DAY' | 'MONTH' | 'YEAR';

@Component({
  selector: 'rls-picker-date-range',
  standalone: true,
  templateUrl: 'picker-date-range.component.html',
  styleUrls: ['picker-date-range.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RlsButtonComponent,
    RlsPickerDayRangeComponent,
    RlsPickerMonthComponent,
    RlsPickerMonthTitleComponent,
    RlsPickerYearComponent
  ]
})
export class RlsPickerDateRangeComponent implements OnInit {
  public formControl = input<AngularVoid<DateRange>>();

  public minDate = input<Date | undefined>(undefined);

  public maxDate = input<Date | undefined>(undefined);

  public automatic = input(false);

  public listener = output<PickerListener<DateRange>>();

  private value: DateRange;

  protected date = signal(new Date());

  protected dateGroup: PickerDateRangeGroup;

  protected visibility = signal<Visibility>('DAY');

  protected title = computed(() =>
    dateFormatTemplate(this.date(), FORMAT_TITLE)
  );

  protected year = computed(() => this.date().getFullYear().toString());

  protected month = computed(() => MONTH_NAMES(this.date().getMonth()));

  constructor() {
    this.value = DateRange.now();
    this.dateGroup = new PickerDateRangeGroup(this.value, this.date());

    effect(() => {
      const year = this.dateGroup.year.value();

      if (valueIsDefined(year)) {
        const currentDate = untracked(this.date);

        if (currentDate.getFullYear() !== year) {
          this.date.set(assignYearInDate(currentDate, year));
          this.visibility.set('DAY');
        }
      }
    });

    effect(() => {
      const month = this.dateGroup.month.value();

      if (valueIsDefined(month)) {
        const currentDate = untracked(this.date);

        if (currentDate.getMonth() !== month) {
          this.date.set(assignMonthInDate(currentDate, month));
          this.visibility.set('DAY');
        }
      }
    });

    effect(() => {
      this.value = this.dateGroup.day.value();
    });

    effect(() => {
      const value = this.formControl()?.value();

      if (value) {
        this.value = value;
      }
    });
  }

  public ngOnInit(): void {
    this.dateGroup.setDate(
      verifyDateRange({
        date: this.date(),
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
    this.emitDateRange(this.value);
  }

  public onCancel(): void {
    this.emitListener(PickerListenerEvent.Cancel);
  }

  private emitListener(event: PickerListenerEvent, value?: DateRange): void {
    this.listener.emit({ event, value });
  }

  private emitDateRange(value: DateRange): void {
    this.formControl()?.setValue(value);
    this.emitListener(PickerListenerEvent.Select, value);
  }
}
