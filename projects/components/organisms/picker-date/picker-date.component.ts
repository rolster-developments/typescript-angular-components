import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { itIsDefined } from '@rolster/commons';
import { PickerListenerType, checkDateRange } from '@rolster/components';
import {
  MONTH_NAMES,
  assignDayInDate,
  assignMonthInDate,
  assignYearInDate,
  dateFormatTemplate
} from '@rolster/dates';
import { FormControl } from '@rolster/forms';
import { RlsButtonComponent, RlsIconComponent } from '../../atoms';
import {
  RlsPickerDayComponent,
  RlsPickerMonthComponent,
  RlsPickerMonthTitleComponent,
  RlsPickerYearComponent
} from '../../molecules';
import { PickerDateGroup } from './picker-date.controls';

const FORMAT_TITLE = '{dw}, {mx} {dd} de {aa}';

type Visibility = 'DAY' | 'MONTH' | 'YEAR';

export interface PickerDateListener {
  type: PickerListenerType;
  value?: Date;
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
    RlsPickerMonthTitleComponent,
    RlsPickerYearComponent
  ]
})
export class RlsPickerDateComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public formControl?: FormControl<Date | undefined>;

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  @Input()
  public automatic = false;

  @Output()
  public listener: EventEmitter<PickerDateListener>;

  private unsubscriptions: (() => void)[] = [];

  private unsubscription?: () => void;

  protected value: Date;

  protected dateGroup: PickerDateGroup;

  protected visibility: Visibility = 'DAY';

  constructor() {
    this.listener = new EventEmitter();
    this.value = new Date();
    this.dateGroup = new PickerDateGroup(this.value);
  }

  public ngOnInit(): void {
    this.unsubscriptions.push(
      this.dateGroup.year.subscribe((year) => {
        if (itIsDefined(year)) {
          this.value = assignYearInDate(this.value, year);
          this.visibility = 'DAY';
        }
      })
    );

    this.unsubscriptions.push(
      this.dateGroup.month.subscribe((month) => {
        if (itIsDefined(month)) {
          this.value = assignMonthInDate(this.value, month);
          this.visibility = 'DAY';
        }
      })
    );

    this.unsubscriptions.push(
      this.dateGroup.day.subscribe((day) => {
        if (itIsDefined(day)) {
          const newValue = assignDayInDate(this.value, day);
          this.value = newValue;

          if (this.automatic) {
            this.emitDate(newValue);
          }
        }
      })
    );

    this.setDate(
      checkDateRange({
        date: this.formControl?.value ?? this.value,
        minDate: this.minDate,
        maxDate: this.maxDate
      })
    );
  }

  public ngOnDestroy(): void {
    this.unsubscriptions.forEach((unsubscription) => {
      unsubscription();
    });

    this.unsubscription && this.unsubscription();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { formControl } = changes;

    if (formControl) {
      this.unsubscription && this.unsubscription();

      this.unsubscription = formControl.currentValue?.subscribe((date) => {
        if (date) {
          this.value = date;
        }
      });
    }
  }

  public get title(): string {
    return dateFormatTemplate(this.value, FORMAT_TITLE);
  }

  public get year(): string {
    return this.value.getFullYear().toString();
  }

  public get month(): string {
    return MONTH_NAMES(this.value.getMonth());
  }

  public onVisibilityDay(): void {
    this.visibility = 'DAY';
  }

  public onVisibilityMonth(): void {
    this.visibility = 'MONTH';
  }

  public onVisibilityYear(): void {
    this.visibility = 'YEAR';
  }

  public onSelect(): void {
    this.emitDate(this.value);
  }

  public onToday(): void {
    const today = new Date(); // Refresh value with Today

    this.setDate(today);
    this.formControl?.setValue(today);
    this.emitListener(PickerListenerType.Now, today);
  }

  public onCancel(): void {
    this.emitListener(PickerListenerType.Cancel);
  }

  private setDate(date: Date): void {
    this.dateGroup.setDate(date);
  }

  private emitListener(type: PickerListenerType, value?: Date): void {
    this.listener.emit({ type, value });
  }

  private emitDate(value: Date): void {
    this.formControl?.setValue(value);
    this.emitListener(PickerListenerType.Select, value);
  }
}
