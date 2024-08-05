import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  AngularControl,
  FormControls,
  FormGroup,
  formControl,
  formGroup
} from '@rolster/angular-forms';
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
import { RlsButtonComponent, RlsIconComponent } from '../../atoms';
import {
  RlsPickerDayComponent,
  RlsPickerMonthComponent,
  RlsPickerMonthTitleComponent,
  RlsPickerYearComponent
} from '../../molecules';

type Visibility = 'DAY' | 'MONTH' | 'YEAR';

interface DatePickerGroup extends FormControls {
  day: AngularControl<number>;
  month: AngularControl<number>;
  year: AngularControl<number>;
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
export class RlsPickerDateComponent implements OnInit, OnDestroy {
  @Input()
  public formControl?: FormControl<Date>;

  @Input()
  public enabled = true;

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  @Input()
  public automatic = false;

  protected value: Date;

  protected dateGroup: FormGroup<DatePickerGroup>;

  protected unsubscriptions: Unsubscription[] = [];

  protected visibility: Visibility = 'DAY';

  constructor() {
    this.value = new Date();

    this.dateGroup = formGroup({
      controls: {
        day: formControl(this.value.getDate()),
        month: formControl(this.value.getMonth()),
        year: formControl(this.value.getFullYear())
      }
    });
  }

  public ngOnInit(): void {
    if (this.formControl) {
      this.unsubscriptions.push(
        this.formControl.subscribe((date) => {
          if (date) {
            this.value = date;
          }
        })
      );
    }

    this.unsubscriptions.push(
      this.dateGroup.controls.year.subscribe((year) => {
        if (itIsDefined(year)) {
          this.value = assignYearInDate(this.value, year);
          this.visibility = 'DAY';
        }
      })
    );

    this.unsubscriptions.push(
      this.dateGroup.controls.month.subscribe((month) => {
        if (itIsDefined(month)) {
          this.value = assignMonthInDate(this.value, month);
          this.visibility = 'DAY';
        }
      })
    );

    this.unsubscriptions.push(
      this.dateGroup.controls.day.subscribe((day) => {
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
        date: this.formControl?.state || this.value,
        minDate: this.minDate,
        maxDate: this.maxDate
      })
    );
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
    this.formControl?.setState(today);

    //this.emitListener(DateListenerType.Today, today);
  }

  public onCancel(): void {
    //this.emitListener(DateListenerType.Cancel);
  }

  private setDate(date: Date): void {
    this.dateGroup.controls.year.setState(date.getFullYear());
    this.dateGroup.controls.month.setState(date.getMonth());
    this.dateGroup.controls.day.setState(date.getDate());
  }

  // private emitListener(type: DateListenerType, value?: Date): void {
  //   this.listener.emit({ type, value });
  // }

  private emitDate(value: Date): void {
    this.formControl?.setState(value);
    //this.emitListener(DateListenerType.Select, value);
  }
}
