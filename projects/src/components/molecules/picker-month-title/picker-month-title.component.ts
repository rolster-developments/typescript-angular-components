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
import { AngularControl } from '@rolster/angular-forms';
import { itIsDefined } from '@rolster/commons';
import { monthLimitTemplate } from '@rolster/components';
import { MONTH_NAMES, Month } from '@rolster/dates';
import { RlsButtonActionComponent } from '../../atoms';

type PickerMonthTitleType = 'month' | 'year';

@Component({
  selector: 'rls-picker-month-title',
  standalone: true,
  templateUrl: 'picker-month-title.component.html',
  styleUrls: ['picker-month-title.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RlsButtonActionComponent]
})
export class RlsPickerMonthTitleComponent
  implements OnInit, OnDestroy, OnChanges
{
  @Input()
  public monthControl?: AngularControl<number>;

  @Input()
  public yearControl?: AngularControl<number>;

  @Input()
  public date: Date;

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  @Input()
  public disabled = false;

  @Input()
  public type: PickerMonthTitleType = 'month';

  @Output()
  public title: EventEmitter<void>;

  private unsubscriptions: Unsubscription[] = [];

  protected name: string;

  protected limitPrevious = false;

  protected limitNext = false;

  constructor() {
    this.name = MONTH_NAMES()[new Date().getMonth()];

    this.date = new Date();
    this.title = new EventEmitter();
  }

  public ngOnInit(): void {
    if (this.monthControl) {
      this.unsubscriptions.push(
        this.monthControl.subscribe((state) => {
          this.name = MONTH_NAMES()[state || 0];

          const { limitNext, limitPrevious } = monthLimitTemplate({
            date: this.date,
            maxDate: this.maxDate,
            minDate: this.minDate,
            month: state
          });

          this.limitNext = limitNext;
          this.limitPrevious = limitPrevious;
        })
      );
    }
  }

  public ngOnDestroy(): void {
    this.unsubscriptions.forEach((unsubscription) => {
      unsubscription();
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { date, maxDate, minDate } = changes;

    if (date || minDate || maxDate) {
      const { limitNext, limitPrevious } = monthLimitTemplate({
        date: this.date,
        maxDate: this.maxDate,
        minDate: this.minDate,
        month: this.monthControl?.state
      });

      this.limitNext = limitNext;
      this.limitPrevious = limitPrevious;
    }
  }

  public onTitle(): void {
    this.title.emit();
  }

  public onPrevious(): void {
    this.type === 'month' ? this.onPreviousMonth() : this.onPreviousYear();
  }

  public onNext(): void {
    this.type === 'month' ? this.onNextMonth() : this.onNextYear();
  }

  private onPreviousMonth(): void {
    if (
      itIsDefined(this.monthControl?.state) &&
      itIsDefined(this.yearControl?.state)
    ) {
      if (this.monthControl.state > Month.January) {
        this.monthControl.setState(this.monthControl.state - 1);
      } else {
        this.monthControl.setState(Month.December);
        this.yearControl.setState(this.yearControl.state - 1);
      }
    }
  }

  private onPreviousYear(): void {
    if (itIsDefined(this.yearControl?.state)) {
      this.yearControl.setState(this.yearControl.state - 1);
    }
  }

  private onNextMonth(): void {
    if (
      itIsDefined(this.monthControl?.state) &&
      itIsDefined(this.yearControl?.state)
    ) {
      if (this.monthControl.state < Month.December) {
        this.monthControl.setState(this.monthControl.state + 1);
      } else {
        this.monthControl.setState(Month.January);
        this.yearControl.setState(this.yearControl.state + 1);
      }
    }
  }

  private onNextYear(): void {
    if (itIsDefined(this.yearControl?.state)) {
      this.yearControl.setState(this.yearControl.state + 1);
    }
  }
}
