import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { itIsDefined } from '@rolster/commons';
import { checkDateRange } from '@rolster/components';
import {
  MONTH_NAMES,
  assignDayInDate,
  assignMonthInDate,
  assignYearInDate,
  dateFormatTemplate
} from '@rolster/dates';
import { FormControl } from '@rolster/forms';
import { CommonModule } from '@angular/common';
import {
  RlsPickerDayComponent,
  RlsPickerMonthComponent,
  RlsPickerYearComponent
} from '../../molecules';
import { RlsButtonComponent, RlsIconComponent } from '../../atoms';

interface Visibility {
  day: boolean;
  month: boolean;
  year: boolean;
}

@Component({
  selector: 'rls-picker-date',
  standalone: true,
  templateUrl: 'picker-date.component.html',
  styleUrls: ['picker-date.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RlsButtonComponent,
    RlsIconComponent,
    RlsPickerDayComponent,
    RlsPickerMonthComponent,
    RlsPickerYearComponent
  ]
})
export class BoccDatePickerComponent implements OnInit, OnDestroy {
  @Input()
  public formControl?: FormControl<Date>;

  @Input()
  public enabled = true;

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  @Input()
  public automatic = true;

  @Output()
  public listener: EventEmitter<DateListener>;

  protected value: Date;

  protected dateControl: DatePickerControls;

  protected unsubscriptions: Unsubscription[] = [];

  protected visibility: Visibility;

  constructor() {
    this.listener = new EventEmitter();

    this.value = new Date();

    this.dateControl = new DatePickerControls(this.value);

    this.visibility = {
      day: true,
      month: false,
      year: false
    };
  }

  public ngOnInit(): void {
    this.unsubscriptions.push(
      this.formControl?.subscribe((date) => {
        if (date) {
          this.value = date;
        }
      })
    );

    this.unsubscriptions.push(
      this.dateControl.year.subscribe((year) => {
        if (itIsDefined(year)) {
          this.value = assignYearInDate(this.value, year);
          this.show('day');
        }
      })
    );

    this.unsubscriptions.push(
      this.dateControl.month.subscribe((month) => {
        if (itIsDefined(month)) {
          this.value = assignMonthInDate(this.value, month);
          this.show('day');
        }
      })
    );

    this.unsubscriptions.push(
      this.dateControl.day.subscribe((day) => {
        if (itIsDefined(day)) {
          const newValue = assignDayInDate(this.value, day);
          this.value = newValue;

          if (this.automatic) {
            this.emitDate(newValue);
          }
        }
      })
    );

    const dateValue = checkDateRange({
      date: this.formControl?.state || this.value,
      minDate: this.minDate,
      maxDate: this.maxDate
    });

    this.dateControl.setDate(dateValue);
  }

  public ngOnDestroy(): void {
    this.unsubscriptions.forEach((unsubscription) => {
      unsubscription();
    });
  }

  public get title(): string {
    return dateFormatTemplate(this.value, '{dw} - {mx}. {dd}, {aa}');
  }

  public get year(): string {
    return this.value.getFullYear().toString();
  }

  public get month(): string {
    return MONTH_NAMES(this.value.getMonth());
  }

  public onClickDay(): void {
    this.show('day');
  }

  public onClickMonth(): void {
    this.show('month');
  }

  public onClickYear(): void {
    this.show('year');
  }

  public onSelect(): void {
    this.emitDate(this.value);
  }

  public onToday(): void {
    const today = new Date(); // Refresh value with Today

    this.dateControl.year.setState(today.getFullYear());
    this.dateControl.month.setState(today.getMonth());
    this.dateControl.day.setState(today.getDate());

    this.formControl?.setState(today);

    this.emitListener(DateListenerType.Today, today);
  }

  public onCancel(): void {
    this.emitListener(DateListenerType.Cancel);
  }

  private emitListener(type: DateListenerType, value?: Date): void {
    this.listener.emit({ type, value });
  }

  private emitDate(value: Date): void {
    this.formControl?.setState(value);
    this.emitListener(DateListenerType.Select, value);
  }

  private show(key: keyof Visibility): void {
    Object.keys(this.visibility).forEach((key) => {
      this.visibility[key] = false;
    });

    this.visibility[key] = true; // Visible
  }
}
