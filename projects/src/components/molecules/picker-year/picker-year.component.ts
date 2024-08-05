import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { AngularControl } from '@rolster/angular-forms';
import { itIsDefined } from '@rolster/commons';
import {
  YearPickerProps,
  YearPickerTemplate,
  YearState,
  checkYearPicker,
  createYearPicker
} from '@rolster/components';
import { RlsButtonActionComponent } from '../../atoms';

@Component({
  selector: 'rls-picker-year',
  standalone: true,
  templateUrl: 'picker-year.component.html',
  styleUrls: ['picker-year.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RlsButtonActionComponent]
})
export class RlsPickerYearComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  public formControl?: AngularControl<number>;

  @Input()
  public date: Date;

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  @Input()
  public disabled = false;

  private unsubscription?: Unsubscription;

  private value: number;

  private year: number;

  protected template: YearPickerTemplate;

  constructor() {
    this.date = new Date();

    this.value = this.date.getFullYear();
    this.year = this.value;

    this.template = createYearPicker(this.createPickerProps());
  }

  public ngOnInit(): void {
    this.unsubscription = this.formControl?.subscribe((year) => {
      this.setValue(year || this.date.getFullYear());
    });

    this.renderComponent(this.createPickerProps());
  }

  public ngOnDestroy(): void {
    if (this.unsubscription) {
      this.unsubscription();
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { date, maxDate, minDate } = changes;

    if (date || minDate || maxDate) {
      const props = this.createPickerProps();
      const year = checkYearPicker(props);

      if (year) {
        if (this.formControl) {
          this.formControl.setState(year);
        } else {
          this.year = year;
          this.value = year;
        }
      } else {
        this.renderComponent(props);
      }
    }
  }

  public onSelect({ value }: YearState): void {
    if (value) {
      this.formControl?.setState(value);
    }
  }

  public onPrev(): void {
    this.year = this.year - 8; // Disminuyendo rango
    this.renderComponent(this.createPickerProps(this.year));
  }

  public onNext(): void {
    this.year = this.year + 8; // Incrementando rango
    this.renderComponent(this.createPickerProps(this.year));
  }

  private createPickerProps(year?: number): YearPickerProps {
    return {
      date: this.date,
      year: year || this.value || this.date.getFullYear(),
      minDate: this.minDate,
      maxDate: this.maxDate
    };
  }

  private setValue(value: number): void {
    const props = this.createPickerProps(value);
    const year = checkYearPicker(props);

    if (itIsDefined(year)) {
      this.formControl?.setState(year);
    } else {
      this.value = value;
      this.year = value;
      this.renderComponent(props);
    }
  }

  private renderComponent(props: YearPickerProps): void {
    this.template = createYearPicker(props);
  }
}
